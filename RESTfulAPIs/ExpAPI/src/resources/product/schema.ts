import Joi from 'joi';

export const productSchema = Joi.object({
 name: Joi.string().min(3).max(100).required(),
 price: Joi.number().required(),
 stockQuantity: Joi.number().integer().required()
});

