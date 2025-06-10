const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:userId", getUserById);

userRoutes.post("/", createUser);

userRoutes.put("/:userId", updateUser);

userRoutes.delete("/:email", deleteUser);

module.exports = userRoutes;
