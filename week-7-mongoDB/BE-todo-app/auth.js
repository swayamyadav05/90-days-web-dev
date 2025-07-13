require("dotenv").config;
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET_KEY);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Invalid Credentials",
        });
    }
}

module.exports = {
    auth,
    JWT_SECRET_KEY,
};
