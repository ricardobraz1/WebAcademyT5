import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).required(),
  userTypeId: Joi.string().uuid().required()
});
