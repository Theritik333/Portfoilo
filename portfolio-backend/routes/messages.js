const express = require("express");
const router = express.Router();
const { sendMessage, getAllMessages, markAsRead, deleteMessage } = require("../controllers/messageController");
const { protect } = require("../middleware/auth");
const { contactLimiter } = require("../middleware/rateLimit");

// Public - contact form
router.post("/", contactLimiter, sendMessage);

// Admin only
router.get("/", protect, getAllMessages);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
