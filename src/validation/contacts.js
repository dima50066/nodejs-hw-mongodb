import Joi from 'joi';

export const createContactSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 20 characters long',
    'string.empty': 'Name cannot be an empty field',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be an empty field',
    'string.min': 'Phone number must be at least 3 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be an empty field',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is a required field',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type must be a string',
    'any.only':
      'Contact type must be one of the following: work, home, personal',
  }),
  isFavourite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
});
