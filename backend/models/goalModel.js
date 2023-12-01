const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

goalSchema.statics.getGoals = async function (user) {
  const goals = await this.find({ user });

  return goals;
};

goalSchema.statics.setGoal = async function (text, user) {
  const goal = await this.create({ text, user });

  return goal;
};

goalSchema.statics.updateGoal = async function (id, text, user) {
  const goal = await this.findById(id);

  if (goal) {
    goal.text = text /* || goal.text */;
    goal.user = user /* || goal.user */;

    const updatedGoal = await goal.save();

    return updatedGoal;
  } else {
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
