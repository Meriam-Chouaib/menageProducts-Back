import { Endpoints } from '@app/config/endpoints'
import { UserController } from '@app/controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.get(Endpoints.ROOT, UserController.getUsers)
export default userRouter
