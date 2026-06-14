const register = (req, res) => {
    res.json({ message: "Register endpoint" });
};

const login = (req, res) => {
    res.json({ message: "Login endpoint" });
};

module.exports = {
    register,
    login
};