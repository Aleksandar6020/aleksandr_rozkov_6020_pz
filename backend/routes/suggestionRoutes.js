const express = require("express");
const { getSuggestions, createSuggestion, updateSuggestion } = require("../controllers/suggestionController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/", protect, authorize("admin"), getSuggestions);
router.post("/", protect, createSuggestion);
router.patch("/:id", protect, authorize("admin"), updateSuggestion);
module.exports = router;
