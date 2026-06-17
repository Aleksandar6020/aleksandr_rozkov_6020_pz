const Manul = require("../models/Manul");
const { manulSchema, manulUpdateSchema } = require("../validators/manulValidator");

const getManuls = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;
        const filter = {};

        if (req.query.locationType) filter.locationType = req.query.locationType;
        if (req.query.search) filter.name = { $regex: req.query.search, $options: "i" };

        const total = await Manul.countDocuments(filter);
        const manuls = await Manul.find(filter).sort({ [sortBy]: order }).skip((page - 1) * limit).limit(limit);

        if (req.query.page || req.query.limit) {
            return res.json({ items: manuls, page, limit, total, pages: Math.ceil(total / limit) });
        }
        res.json(manuls);
    } catch (err) {
        next(err);
    }
};

const getManul = async (req, res, next) => {
    try {
        const manul = await Manul.findById(req.params.id);
        if (!manul) return res.status(404).json({ message: "Manul not found" });
        res.json(manul);
    } catch (err) {
        next(err);
    }
};

const createManul = async (req, res, next) => {
    try {
        const { value, error } = manulSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });
        const created = await Manul.create(value);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

const updateManul = async (req, res, next) => {
    try {
        const { value, error } = manulUpdateSchema.validate(req.body, { abortEarly: false });
        if (error) return res.status(400).json({ message: error.details.map((d) => d.message).join(", ") });
        const updated = await Manul.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Manul not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

const deleteManul = async (req, res, next) => {
    try {
        const deleted = await Manul.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Manul not found" });
        res.json({ message: "Manul deleted", id: req.params.id });
    } catch (err) {
        next(err);
    }
};

module.exports = { getManuls, getManul, createManul, updateManul, deleteManul };
