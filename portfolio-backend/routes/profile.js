const express = require("express");
const router = express.Router();
const { getProfile, createProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/", getProfile);
router.post("/", protect, createProfile);
router.put("/", protect, updateProfile);

module.exports = router;
