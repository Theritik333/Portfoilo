const mongoose = require("mongoose");

const TechStackSchema = new mongoose.Schema({
  layer: String,
  tech: String,
});

const KeyDecisionSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date },
  shortDesc: { type: String },
  fullDesc: { type: String },
  liveUrl: { type: String },
  thumbnail: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },

  // Sections
  theProblem: { type: String },
  whatItDoes: [{ title: String, description: String }],
  architecture: { type: String }, // code tree as string
  techStack: [TechStackSchema],
  keyDecisions: [KeyDecisionSchema],
  challengesSolved: [KeyDecisionSchema],
  performance: { type: String }, // code tree as string

}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
