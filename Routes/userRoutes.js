const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const { authorize, protect } = require("../middlewares/authMiddleware");

const userRoutes = express.Router();

userRoutes.get(
  "/",
  protect,
  authorize("admin", "super_admin", "user"),
  getUsers
);

userRoutes.get(
  "/:userId",
  protect,
  authorize("admin", "super_admin", "user"),
  getUserById
);

userRoutes.post("/", protect, authorize("admin", "super_admin"), createUser);

userRoutes.put(
  "/:userId",
  protect,
  authorize("admin", "super_admin"),
  updateUser
);

userRoutes.delete("/:email", protect, authorize("super_admin"), deleteUser);

module.exports = userRoutes;
