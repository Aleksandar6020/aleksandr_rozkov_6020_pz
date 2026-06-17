const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model("User", userSchema);
