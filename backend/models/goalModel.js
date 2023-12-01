const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

goalSchema.statics.getGoals = async function (userId) {
  const goals = await this.find({ user_id: userId });

  return goals;
};

goalSchema.statics.setGoal = async function (text, userId) {
  const goal = await this.create({ text, user_id: userId });

  return goal;
};

goalSchema.statics.updateGoal = async function (id, text, user) {
  const goal = await this.findById(id);

  if (goal) {
    goal.text = text;
    goal.user_id = user._id;

    const updatedGoal = await goal.save();

    return updatedGoal;
  } else {
    console.log("foo");
    throw new Error("Goal not found");
  }
};

goalSchema.statics.deleteGoal = async function (id) {
  const goal = await this.findById(id);

  if (goal) {
    await goal.remove();
  } else {
    throw new Error("Goal not found");
  }
};

module.exports = mongoose.model("Goal", goalSchema);
