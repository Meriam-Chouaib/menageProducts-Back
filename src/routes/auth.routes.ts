import { Endpoints } from '@app/config/endpoints'
import { AuthController } from '@app/controllers'
import { authenticate } from '@app/middlewares/authenticate.middleware'
import { validate } from '@app/middlewares/validate.middleware copy'
import { authSchema } from '@app/schemas/auth'
import express from 'express'

const authRouter = express.Router()
authRouter.post(
  Endpoints.auth.SIGNUP,
  validate(authSchema.register),
  AuthController.signUp
)
authRouter.post(Endpoints.auth.SIGNIN, AuthController.signIn)
authRouter.post(Endpoints.auth.LOGOUT, authenticate, AuthController.logout)
export default authRouter
