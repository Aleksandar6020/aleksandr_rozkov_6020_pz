const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    manulId: { type: mongoose.Schema.Types.ObjectId, ref: "Manul", required: true },
    type: { type: String, enum: ["LIKE", "STORY"], required: true },
    content: { type: String, default: "" },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
    createdAt: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

suggestionSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.userId = ret.userId?.toString();
        ret.manulId = ret.manulId?.toString();
        delete ret._id;
        return ret;
    }
});

suggestionSchema.index({ userId: 1, manulId: 1, type: 1 }, { unique: true, partialFilterExpression: { type: "LIKE" } });

module.exports = mongoose.model("Suggestion", suggestionSchema);
