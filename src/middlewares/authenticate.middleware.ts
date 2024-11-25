import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'
import { isBlacklisted } from '@app/utils/jwt'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  const isBlacklistedToken = await isBlacklisted(token)
  if (!token || isBlacklistedToken) {
    res.status(401).json({ error: 'Authentication required' })
    next()
  } else
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
      decoded && next()
    } catch (err) {
      res.status(401).json({ error: 'Invalid or expired token' })
    }
}
