require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({
        message: "You are not signed in",
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  adminMiddleware,
};
