const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS — sab origins allow karo (frontend localhost:3001 ke liye)
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "https://portfoliorikin.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// DB Connect
const connectDB = require("./config/db");
connectDB();

// Routes
app.use("/api/profile", require("./routes/profile"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/social", require("./routes/social"));
app.use("/api/tech-icons", require("./routes/techIcons"));
app.use("/api/admin", require("./routes/admin"));

// Health check
app.get("/", (req, res) => res.json({ message: "Portfolio API Running ✓" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
