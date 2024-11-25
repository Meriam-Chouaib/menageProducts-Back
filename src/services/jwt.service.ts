import jwt from 'jsonwebtoken'
import { NextFunction } from 'express'
import { config } from '@app/config/config'
interface JWTPayload {
  id: number
  email: string
}

const signToken = (payload: JWTPayload) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  })
  return token
}
const decodeToken = (token: string, next: NextFunction) => {
  try {
    const decodedToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    return decodedToken
  } catch (err) {
    console.error(err)
    return null
  }
}
export { signToken, decodeToken }
