const express = require("express");
const router = express.Router();
const SocialLink = require("../models/SocialLink");
const { protect } = require("../middleware/auth");

// GET all social links (public)
router.get("/", async (req, res) => {
  try {
    const links = await SocialLink.find().sort({ order: 1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create (admin)
router.post("/", protect, async (req, res) => {
  try {
    const link = new SocialLink(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update (admin)
router.put("/:id", protect, async (req, res) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE (admin)
router.delete("/:id", protect, async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: "Social link deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
