const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  location: { type: String },
  college: { type: String },
  photo: { type: String },
  pronounceAudio: { type: String },
  aboutText: { type: String },
  whatIFocusOn: [{ type: String }],
  howIWork: [{ type: String }],
  principles: [{ type: String }],
  aiChatPlaceholder: { type: String, default: "Ask anything, blazingly fast..." },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
