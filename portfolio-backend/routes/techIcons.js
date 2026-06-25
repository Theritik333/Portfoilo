const express = require("express");
const router = express.Router();
const TechIcon = require("../models/TechIcon");
const { protect } = require("../middleware/auth");

// GET all (public)
router.get("/", async (req, res) => {
  try {
    const icons = await TechIcon.find().sort({ order: 1 });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create (admin)
router.post("/", protect, async (req, res) => {
  try {
    const icon = new TechIcon(req.body);
    await icon.save();
    res.status(201).json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update (admin)
router.put("/:id", protect, async (req, res) => {
  try {
    const icon = await TechIcon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(icon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE (admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    await TechIcon.findByIdAndDelete(req.params.id);
    res.json({ message: "Tech icon deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
