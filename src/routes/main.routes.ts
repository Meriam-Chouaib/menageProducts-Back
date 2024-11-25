import express, { Application, Request, Response } from 'express'
import { Endpoints } from '../config/endpoints'

import productRoutes from './product.routes'
import authRoutes from '@app/routes/auth.routes'
import userRoutes from '@app/routes/user.routes'
import { config } from '@app/config/config'
import session from 'express-session'

export const mainRouter = express.Router()

mainRouter.use(Endpoints.product.ROOT, productRoutes)
mainRouter.use(Endpoints.auth.ROOT, authRoutes)
mainRouter.use(Endpoints.users.ROOT, userRoutes)
