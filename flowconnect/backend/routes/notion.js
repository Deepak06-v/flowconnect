const express = require("express");
const axios = require("axios");

const router = express.Router();

// SECURITY: All Notion API calls are proxied through this backend endpoint.
// The actual NOTION_API_KEY is stored securely in backend environment variables
// and never sent to the frontend. This prevents credential exposure in:
// - Browser DevTools and source maps
// - Network inspection tools
// - Client-side caching or localStorage
// - Build artifacts

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_BASE_URL = "https://api.notion.com/v1";

if (!NOTION_API_KEY) {
  console.warn("NOTION_API_KEY is not set. Notion integration will be unavailable.");
}

// Proxy endpoint: forwards Notion API requests from frontend to Notion API,
// injecting the server-side API key. Frontend never sees the key.
router.post("/proxy", async (req, res) => {
  try {
    if (!NOTION_API_KEY) {
      return res.status(503).json({ error: "Notion integration not configured" });
    }

    const { endpoint, body } = req.body;
    const method = req.headers["x-notion-method"]?.toLowerCase() || "get";

    if (!endpoint) {
      return res.status(400).json({ error: "Missing endpoint parameter" });
    }

    const url = `${NOTION_BASE_URL}/${endpoint}`;

    const axiosConfig = {
      method,
      url,
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2024-10-08",
        "Content-Type": "application/json",
      },
    };

    if (body && (method === "post" || method === "patch" || method === "put")) {
      axiosConfig.data = body;
    }

    const response = await axios(axiosConfig);
    res.json(response.data);
  } catch (error) {
    console.error("Notion proxy error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data?.message || "Notion API error",
        code: error.response.data?.code || "UNKNOWN",
      });
    }

    res.status(500).json({ error: "Notion proxy request failed" });
  }
});

module.exports = router;
