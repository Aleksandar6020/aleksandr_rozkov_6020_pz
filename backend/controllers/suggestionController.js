const Suggestion = require("../models/Suggestion");
const Manul = require("../models/Manul");
const { suggestionSchema, suggestionUpdateSchema } = require("../validators/suggestionValidator");

const getSuggestions = async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.type) filter.type = req.query.type;
        if (req.query.status) filter.status = req.query.status;

        const suggestions = await Suggestion.find(filter).sort({ createdAt: -1 });
        res.json(suggestions);
    } catch (err) {
        next(err);
    }
};

const createSuggestion = async (req, res, next) => {
    try {
        const { value, error } = suggestionSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });

        const manul = await Manul.findById(value.manulId);
        if (!manul) return res.status(404).json({ message: "Manul not found" });

        const payload = { ...value, userId: req.user._id };

        if (value.type === "LIKE") {
            const existingLike = await Suggestion.findOne({ userId: req.user._id, manulId: value.manulId, type: "LIKE" });
            if (existingLike) return res.status(409).json({ message: "You already liked this manul" });
        }

        const created = await Suggestion.create(payload);

        if (value.type === "LIKE") await Manul.findByIdAndUpdate(value.manulId, { $inc: { likesCount: 1 } });

        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

const updateSuggestion = async (req, res, next) => {
    try {
        const { value, error } = suggestionUpdateSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });
        const updated = await Suggestion.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Suggestion not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

module.exports = { getSuggestions, createSuggestion, updateSuggestion };
