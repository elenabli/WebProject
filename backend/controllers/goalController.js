const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  const goals = await Goal.getGoals(req.user.id);

  res.status(200).json(goals);
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  const user_id = req.user.id;
  const { text } = req.body;
  try {
    const goal = await Goal.setGoal(text, user_id);
    console.log(user_id);

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  try {
    const goal = await Goal.updateGoal(
      req.params.id,
      req.body.text,
      req.user.id
    );

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    await Goal.deleteGoal(req.params.id);

    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
