const mongoose = require("mongoose");

const manulSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    photoUrl: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    longStory: { type: String, required: true },
    locationType: { type: String, enum: ["ZOO", "WILD"], default: "ZOO" },
    zooId: { type: Number, default: null },
    region: { type: String, default: "" },
    tags: [{ type: String }],
    likesCount: { type: Number, default: 0, min: 0 },
    createdAt: { type: Date, default: Date.now }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

manulSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
});

module.exports = mongoose.model("Manul", manulSchema);
