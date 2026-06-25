const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");

// Public
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

// Admin only
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
