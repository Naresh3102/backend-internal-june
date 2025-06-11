const express = require("express");
const { register, login, logout } = require("../Controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

module.exports = authRoutes;
