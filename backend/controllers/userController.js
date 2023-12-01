const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.registerUser(name, email, password);

    const token = createToken(user._id);
    const id = user._id;

    res.status(200).json({ id, name, email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    const token = createToken(user._id);
    const id = user._id;

    res.status(200).json({ id, email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
