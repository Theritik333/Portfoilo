const Profile = require("../models/Profile");

// GET profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create profile (admin)
const createProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) return res.status(400).json({ message: "Profile already exists. Use PUT to update." });
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update profile (admin)
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, createProfile, updateProfile };
