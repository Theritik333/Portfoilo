const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "https://portfoliorikin.netlify.app",
    "https://portfoilo-dashboard.netlify.app"
  ]
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

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API Running ✓" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));