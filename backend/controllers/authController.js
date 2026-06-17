const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { registerSchema, loginSchema } = require("../validators/authValidator");

const publicUser = (user) => ({
    id: user._id.toString(),
    email: user.email,
    role: user.role
});

const register = async (req, res, next) => {
    try {
        const { value, error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });

        const exists = await User.findOne({ email: value.email });
        if (exists) return res.status(409).json({ message: "Email already exists" });

        const user = await User.create(value);
        res.status(201).json({ user: publicUser(user), token: generateToken(user) });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });

        const user = await User.findOne({ email: value.email });
        if (!user || !(await user.matchPassword(value.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ user: publicUser(user), token: generateToken(user) });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login };
