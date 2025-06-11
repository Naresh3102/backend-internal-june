const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie("jwt", token, {
      maxAge: parseInt(process.env.COOKIE_EXPIRY),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { email, password, name, age } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await User.create({ email, password, name, age });
    res.status(201).json({
      message: "User Created",
      newUser, // optional
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, logout };
