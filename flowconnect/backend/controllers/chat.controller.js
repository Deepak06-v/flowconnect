const Message = require("../models/Message");

// Default and maximum page size for paginated message responses.
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

/**
 * GET /api/messages
 *
 * Returns a page of messages in descending creation order.
 * Supports cursor-based pagination via the `before` query parameter
 * (a message ID returned in a previous response). A default page size of
 * 50 is applied; the maximum is 100.
 *
 * Without pagination the endpoint would perform a full collection scan and
 * return the entire message history on every request, causing large payloads
 * and slow initial loads as the chat history grows.
 */
const getMessages = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || DEFAULT_LIMIT, MAX_LIMIT);
    const before = req.query.before;

    const query = {};
    if (before) {
      query._id = { $lt: before };
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      messages,
      hasMore: messages.length === limit,
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};

/**
 * POST /api/messages
 *
 * Stores a new chat message and broadcasts it to all connected Socket.IO clients.
 * The username is derived from the authenticated session attached by the
 * authenticateUser middleware. Accepting username from the request body would
 * allow any authenticated caller to impersonate a different user.
 */
const sendMessage = async (req, res) => {
  try {
    const { text, image, audio } = req.body;

    if (!text && !image && !audio) {
      return res.status(400).json({ error: "Message content is required." });
    }

    // Use the identity from the verified JWT token, not the request body.
    const username = req.user.username || req.user.name || req.user.email || "Anonymous";
    const userId = req.user.id || req.user.userId;

    const message = await Message.create({
      text: text || "",
      username,
      userId,
      image: image || null,
      audio: audio || null,
    });

    // Broadcast to all connected Socket.IO clients so the chat updates in real time.
    const io = req.app.get("io");
    if (io) {
      io.emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
};

module.exports = { getMessages, sendMessage };
