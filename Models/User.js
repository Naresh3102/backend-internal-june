const { Schema, model } = require("mongoose");

//schema create
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, , "Email is required"],
      unique: true,
      match: [/^[^@]+@[^@]+\.[^@]+$/, "Email format is invalid"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be atleast 6 chars"],
    },
    phno: Number,
    address: String,
    user_date: {
      type: Date,
      default: new Date(),
    },
    age: {
      type: Number,
      min: [18, "Age must be least 18"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//model create

const User = model("User", userSchema);

module.exports = User;
