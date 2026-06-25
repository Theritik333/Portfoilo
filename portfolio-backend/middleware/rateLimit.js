const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 messages per hour per IP
  message: { message: "Too many messages sent. Try again after 1 hour." },
});

module.exports = { contactLimiter };
