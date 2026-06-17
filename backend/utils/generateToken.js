const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

const generateToken = (user) => jwt.sign(
    { id: user._id.toString(), role: user.role },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
);

module.exports = generateToken;
