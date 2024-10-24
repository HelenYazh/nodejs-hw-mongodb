import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().min(3).max(20).messages({
        'string.base': 'Email should be a string',
        'string.min': 'Email should have at least {#limit} characters',
        'string.max': 'Email should have at most {#limit} characters',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal").required().messages({
        'any.required': 'Contact type is required',
    }),
});

export const patchContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
    }),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20).messages({
        'string.base': 'Email should be a string',
        'string.min': 'Email should have at least {#limit} characters',
        'string.max': 'Email should have at most {#limit} characters',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal"),
});
