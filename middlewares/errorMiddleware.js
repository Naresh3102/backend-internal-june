const globalErrorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    console.log(err);
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    console.log(err);
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Duplicate key error - unique
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    message,
  });
};

module.exports = globalErrorHandler;
