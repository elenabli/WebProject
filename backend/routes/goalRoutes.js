const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// Route for getting goals (GET /api/goals)
router.route("/goals").get(protect, getGoals);

// Route for creating a new goal (POST /api/goals)
router.route("/goals").post(setGoal);

// Route for updating a goal by ID (PUT /api/goals/:id)
router.route("/goals/:id").put(protect, updateGoal);

// Route for deleting a goal by ID (DELETE /api/goals/:id)
router.route("/goals/:id").delete(protect, deleteGoal);

module.exports = router;
