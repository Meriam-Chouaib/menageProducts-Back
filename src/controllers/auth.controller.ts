import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth.service'
import httpStatus from 'http-status'
import ApiResponse from '@app/utils/ApiResponse'
import { blacklistToken, isBlacklisted } from '@app/utils/jwt'

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data: User = req.body as User
  console.log('data', data)

  try {
    const user = await authService.signup(data)
    res.status(httpStatus.OK).send(user)
  } catch (err) {
    next(err)
  }
}

const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body
  try {
    const result: any = await authService.signin(email, password)
    res.status(result.status).send(result)
  } catch (err) {
    next(err)
  }
}

const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  const blacklisted = await isBlacklisted(token)

  if (!token || blacklisted) {
    res.status(400).json({ error: 'Token required' })
  } else
    try {
      const result = await blacklistToken(token)
      if (result) {
        res.status(200).json({ message: 'Logged out successfully' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to logout' })
    }
}

export { signUp, signIn, logout }
