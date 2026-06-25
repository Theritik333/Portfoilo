const mongoose = require("mongoose");

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // GitHub, LinkedIn, Discord
  url: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("SocialLink", SocialLinkSchema);
