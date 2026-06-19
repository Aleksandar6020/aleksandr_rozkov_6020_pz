const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config/env");

const protect = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, token missing" });
    }

    try {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token invalid" });
    }
};


const optionalAuth = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) return next();

    try {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id).select("-password");
        if (user) req.user = user;
    } catch (error) {
        req.user = null;
    }

    next();
};

module.exports = { protect, optionalAuth };

