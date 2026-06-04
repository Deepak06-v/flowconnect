const express = require("express");
const router = express.Router();

// EXPONENTIAL BACKOFF: Webhook retry mechanism with exponential backoff.
// Prevents hammering target endpoints by spacing out retries over time.
// Formula: delay = 2^attempt * 1000ms (1s, 2s, 4s, 8s, 16s max)

async function retryWithBackoff(fn, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      // Exponential backoff: 2^attempt * 1000ms, capped at 16 seconds
      const delayMs = Math.min(Math.pow(2, attempt) * 1000, 16000);
      console.log(`Webhook retry attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms`);

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

router.post("/deliver/:webhookId", async (req, res) => {
  try {
    const { webhookId } = req.params;
    const { payload, targetUrl } = req.body;

    // Retry with exponential backoff instead of immediate repeated attempts
    await retryWithBackoff(async () => {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    });

    res.json({ success: true, message: "Webhook delivered" });
  } catch (error) {
    console.error(`Webhook delivery failed after retries: ${error.message}`);
    res.status(500).json({ error: "Webhook delivery failed" });
  }
});

module.exports = router;
