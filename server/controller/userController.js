const bcrypt = require("bcryptjs");
const User = require("../models/User");
const publicUser = require("../utils/publicUser");

// @desc  Get logged-in user's profile
// @route GET /api/users/profile
const getProfile = async (req, res, next) => {
  try {
    res.json(publicUser(req.user));
  } catch (error) {
    next(error);
  }
};

// @desc  Update logged-in user's profile
// @route PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json(publicUser(updatedUser));
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
