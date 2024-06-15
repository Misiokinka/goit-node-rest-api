import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email or password is wrong',
        'any.required': 'Missed required email field'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Email or password is wrong',
        'any.required': 'Missed required password field'
    }),
    subscription: Joi.string().valid("starter", "pro", "business")
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email or password is wrong',
        'any.required': 'Missed required email field'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Email or password is wrong',
        'any.required': 'Missed required password field'
    }),
});

export const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});
export const emailSchema = Joi.object({
    email: Joi.string().email().required()
})