const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//model create

const User = model("User", userSchema);

module.exports = User;
