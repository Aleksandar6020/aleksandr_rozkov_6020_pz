const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const manulRoutes = require("./routes/manulRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "CS310 Manul Blog API" }));
app.use("/api/auth", authRoutes);
app.use("/api/manuls", manulRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
