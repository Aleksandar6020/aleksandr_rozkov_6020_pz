const Joi = require("joi");

const suggestionSchema = Joi.object({
    userId: Joi.string().optional(),
    manulId: Joi.string().required(),
    type: Joi.string().valid("LIKE", "STORY").required(),
    content: Joi.string().allow("").optional(),
    status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").optional(),
    createdAt: Joi.date().optional()
});

const suggestionUpdateSchema = Joi.object({
    status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").required()
});

module.exports = { suggestionSchema, suggestionUpdateSchema };
