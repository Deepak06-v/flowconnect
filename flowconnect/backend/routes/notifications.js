const router = require("express").Router();
const Notification = require("../models/Notification");
const { authenticateUser } = require("../middleware/auth");

// GET notifications for a specific user.
// Requires authentication and enforces that the authenticated user can only
// retrieve their own notifications. Without these guards any caller could
// enumerate another user's notification history by guessing their user ID.
router.get("/:userId", authenticateUser, async (req, res) => {
  if (req.user.id !== req.params.userId && req.user.userId !== req.params.userId) {
    return res.status(403).json({ error: "Access denied." });
  }

  try {
    const data = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});

// MARK a notification as read.
// Requires authentication and verifies the caller owns the notification
// before updating it.
router.put("/:id/read", authenticateUser, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    const callerId = req.user.id || req.user.userId;
    if (notification.userId !== callerId) {
      return res.status(403).json({ error: "Access denied." });
    }

    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ error: "Failed to update notification." });
  }
});

module.exports = router;