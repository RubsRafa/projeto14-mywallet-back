import joi from 'joi';

export const registersSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required(),
    type: joi.string().valid("input", "output").required(),
})