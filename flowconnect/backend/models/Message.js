const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  image: { type: String, default: null },
  audio: { type: String, default: null },
  status: { type: String, default: "sent" },
  createdAt: { type: Date, default: Date.now },
});

// Index for efficient cursor-based pagination by creation time.
MessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Message", MessageSchema);
