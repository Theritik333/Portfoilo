const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  ipAddress: { type: String },
  status: { type: String, enum: ["read", "unread"], default: "unread" },
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
