const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.registerUser = async function (name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Please provide name, email and password");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a strong password");
  }
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

userSchema.statics.getMe = async function (id) {
  const user = await this.findById(id).select("-password");

  return user;
};

module.exports = mongoose.model("User", userSchema);
