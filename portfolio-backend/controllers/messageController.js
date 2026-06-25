const Message = require("../models/Message");
const nodemailer = require("nodemailer");

// POST send message (public)
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Save to DB
    const newMessage = new Message({ name, email, message, ipAddress: ip });
    await newMessage.save();

    // Send email via nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Message Received!",
      html: `<p>Hi ${name}, your message has been received. I'll get back to you soon!</p>`,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all messages (admin)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH mark as read (admin)
const markAsRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE message (admin)
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendMessage, getAllMessages, markAsRead, deleteMessage };
