const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Session expired. Login again",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    console.log(decodedData);

    next();
  } catch (error) {
    next(error);
  }
};

// Closure - parent variable can be accessed by child even parent completes its execution

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
