const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register a new user
router.route("/register").post(registerUser);

// Log in a user
router.route("/login").post(loginUser);
// Get user data
router.route("/me").get(protect, getMe);

module.exports = router;
