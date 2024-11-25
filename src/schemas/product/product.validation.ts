import Joi from 'joi'

export const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  price: Joi.number().required().positive(),
  quantity: Joi.number().required().integer().min(0),
  description: Joi.string().optional().min(10).max(255),
  category: Joi.string().optional().min(3).max(50),
})
