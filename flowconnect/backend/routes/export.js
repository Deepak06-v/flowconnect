const express = require("express");
const router = express.Router();

// CREDENTIAL FILTERING: When exporting workflows, remove or mask sensitive
// fields so users don't accidentally share credentials via exported files.

const SENSITIVE_FIELDS = [
  "apiKey",
  "api_key",
  "token",
  "secret",
  "password",
  "accessToken",
  "access_token",
  "refreshToken",
  "refresh_token",
  "bearerToken",
  "auth",
  "apiSecret",
  "clientSecret",
  "client_secret",
];

function filterSensitiveFields(obj, depth = 0) {
  if (depth > 10) return obj; // Prevent infinite recursion
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => filterSensitiveFields(item, depth + 1));
  }

  const filtered = {};
  for (const [key, value] of Object.entries(obj)) {
    // Mask sensitive fields
    if (SENSITIVE_FIELDS.some((field) => key.toLowerCase().includes(field))) {
      filtered[key] = "{{ REDACTED }}";
    } else if (typeof value === "object" && value !== null) {
      filtered[key] = filterSensitiveFields(value, depth + 1);
    } else {
      filtered[key] = value;
    }
  }
  return filtered;
}

router.post("/workflows/:workflowId", async (req, res) => {
  try {
    const { workflowId } = req.params;
    // TODO: Load workflow from database
    // const workflow = await Workflow.findById(workflowId);

    // Filter out sensitive credentials before exporting
    const safeworkflow = filterSensitiveFields({
      // ...workflow
    });

    res.json({
      success: true,
      message: "Workflow exported with credentials masked",
      data: safeworkflow,
    });
  } catch (error) {
    res.status(500).json({ error: "Export failed" });
  }
});

module.exports = router;
