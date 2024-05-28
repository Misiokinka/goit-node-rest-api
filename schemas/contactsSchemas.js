import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(5),
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
})