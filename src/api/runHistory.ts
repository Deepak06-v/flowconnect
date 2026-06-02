export interface ExecutionLog {
  id: string;
  workflow_id: string;
  workflow_name: string;
  success: boolean;
  error?: string;
  payload: any;
  executed_at: string;
}

const AUTH_BASE = import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:3000";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}

export async function getRunHistory(): Promise<ExecutionLog[]> {
  const res = await fetch(`${AUTH_BASE}/api/run-history`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  return res.json();
}

export async function retryJob(logId: string): Promise<void> {
  const res = await fetch(`${AUTH_BASE}/api/workflows/retry/${logId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || `HTTP Error: ${res.status}`);
  }
}