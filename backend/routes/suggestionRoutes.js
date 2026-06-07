const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Suggestion route" });
});

module.exports = router;