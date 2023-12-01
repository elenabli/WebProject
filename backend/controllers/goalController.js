const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
/* const setGoal = async (req, res, next) => {
  const { text } = req.body;
  let emptyFields = [];

  if (!text) {
    emptyFields.push("text");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    // const user_id = req.user._id
    const goal = await Goal.create({ text });
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

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
    const goal = await Goal({ text, user_id });
    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  const { text, user_id } = req.body;
  console.log(user_id);
  console.log(req.params.id);

  try {
    const goal = await Goal.findById(req.params.id);
    console.log(goal);
    // const updatedGoal = await Goal.updateGoal(id, text, user);

    if (goal) {
      goal.text = text;
      console.log("foo2");
      goal.user = user_id;

      const updatedGoal = await goal.save();

      res.status(200).json(updatedGoal);
    } else {
      console.log("foo3");
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
  setGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
