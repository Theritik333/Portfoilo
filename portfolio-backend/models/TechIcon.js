const mongoose = require("mongoose");

const TechIconSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iconUrl: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("TechIcon", TechIconSchema);
