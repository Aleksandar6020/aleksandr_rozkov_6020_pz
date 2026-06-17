const User = require("../models/User");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res) => {
    res.json(req.user);
};

module.exports = { getUsers, getMe };
