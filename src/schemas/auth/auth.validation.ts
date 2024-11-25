import { SignUpUser } from '@app/type/user.type'
import Joi from 'joi'

const registerBody: Record<keyof SignUpUser, any> = {
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$'))
    .message('signup.password_invalid_back'),
  username: Joi.string().required().max(30),
  statut: Joi.string().required(),
  role: Joi.string().required(),
  image: Joi.string().optional(),
  isLogged: Joi.optional(),
  isActive: Joi.optional(),
  phone: Joi.optional(),
}

export const register = {
  body: Joi.object().keys(registerBody),
}
