const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const manulRoutes = require("./routes/manulRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/manuls", manulRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/users", userRoutes);

module.exports = app;