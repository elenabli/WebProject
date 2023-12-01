const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  const goals = await Goal.find({ user: req.user._id });

  res.status(200).json(goals);
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  const { text, user } = req.body;

  try {
    const goal = await Goal.setGoal({ text, user });

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  const { text, user } = req.body;

  try {
    const goal = await Goal.findById(req.params.id);

    if (goal) {
      goal.text = text /* || goal.text */;
      goal.user = user /* || goal.user */;

      const updatedGoal = await goal.save();

      res.status(200).json(updatedGoal);
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);

  try {
    if (goal) {
      await goal.remove();
      res.status(200).json({ message: "Goal removed" });
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
