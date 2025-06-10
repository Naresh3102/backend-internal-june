const User = require("../Models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Success", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json({ message: "Success", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await User.create(userData);
    res.status(201).json({
      message: "User Created",
      newUser, // optional
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        email: userData.email,
      },
      {
        new: true, // Returns updated new data instead of old one
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "user Updated",
      user: updatedUser, // Optional
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    // const deletedUser = await User.findByIdAndDelete(userId);
    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "user Deleted",
      user: deletedUser, // Optional
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
