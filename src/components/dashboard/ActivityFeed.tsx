import { useState } from "react";

export interface ActivityItem {
    id: string;
    name: string;
    timestamp: string;
    status: string;
    executionCount: number;
}

interface ActivityFeedProps {
    activities: ActivityItem[];
}

const ITEMS_PER_PAGE = 5;

export default function ActivityFeed({
    activities,
}: ActivityFeedProps) {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const visibleActivities = activities.slice(0, visibleCount);

    const formatRelativeTime = (timestamp: string) => {
        const now = new Date().getTime();
        const activityTime = new Date(timestamp).getTime();

        const diffMinutes = Math.floor(
            (now - activityTime) / (1000 * 60)
        );

        if (diffMinutes < 1) return "Just now";
        if (diffMinutes < 60) return `${diffMinutes}m ago`;

        const diffHours = Math.floor(diffMinutes / 60);

        if (diffHours < 24) return `${diffHours}h ago`;

        const diffDays = Math.floor(diffHours / 24);

        return `${diffDays}d ago`;
    };

    if (!activities.length) {
        return (
            <div className="recent-activity">
                <h3>Activity Feed</h3>

                <div className="no-activity">
                    No activity yet. Workflow executions will appear here.
                </div>
            </div>
        );
    }

    return (
        <div className="recent-activity">
            <h3>Activity Feed</h3>

            <div className="activity-list">
                {visibleActivities.map((item) => (
                    <div key={item.id} className="activity-item">
                        <div className={`status-dot ${item.status}`} />

                        <div className="activity-info">
                            <p className="activity-name">{item.name}</p>

                            <p className="activity-time">
                                {formatRelativeTime(item.timestamp)} •{" "}
                                {new Date(item.timestamp).toLocaleString()}
                            </p>
                        </div>

                        <span className="exec-count">
                            {item.executionCount} runs
                        </span>
                    </div>
                ))}
            </div>

            {visibleCount < activities.length && (
                <button
                    className="load-more-btn"
                    onClick={() =>
                        setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                    }
                >
                    Load More
                </button>
            )}
        </div>
    );
}