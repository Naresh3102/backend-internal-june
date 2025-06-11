const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const morgan = require("morgan");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./Routes/authRoutes");
dotenv.config();

const server = express();
server.use(express.json());
server.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log("Error: Not connected to DB");
  });

server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.status(200).json({ message: "New Server in this port with get method" });
});

server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/auth", authRoutes);

// Not found routes
server.use((req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  next(err);
});

// Global error handling
server.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
