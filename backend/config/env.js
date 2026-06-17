require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cs310_manuls",
    jwtSecret: process.env.JWT_SECRET || "dev_secret_change_later",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d"
};
