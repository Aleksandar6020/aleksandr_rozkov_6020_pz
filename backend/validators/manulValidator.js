const Joi = require("joi");

const manulSchema = Joi.object({
    name: Joi.string().min(2).required(),
    photoUrl: Joi.string().uri().required(),
    shortDescription: Joi.string().min(5).required(),
    longStory: Joi.string().min(5).required(),
    locationType: Joi.string().valid("ZOO", "WILD").default("ZOO"),
    zooId: Joi.number().allow(null).optional(),
    region: Joi.string().allow("").optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    likesCount: Joi.number().min(0).optional(),
    createdAt: Joi.date().optional()
});

const manulUpdateSchema = manulSchema.fork(["name", "photoUrl", "shortDescription", "longStory"], (schema) => schema.optional());

module.exports = { manulSchema, manulUpdateSchema };
