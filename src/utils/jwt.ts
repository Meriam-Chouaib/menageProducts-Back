import { redis } from '@app/config/redis.config'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRATION = '1h'

// Generate JWT
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
}

// Verify JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Blacklist JWT
export const blacklistToken = async (token: string) => {
  console.log('im here22')

  const decoded: any = jwt.decode(token)
  if (decoded) {
    const exp = decoded.exp
    const result = await redis.set(
      token,
      'blacklisted',
      'EX',
      exp - Math.floor(Date.now() / 1000)
    ) //
    return result
  }
}

// Check if token is blacklisted
export const isBlacklisted = async (token: string): Promise<boolean> => {
  const result = await redis.get(token)
  return result === 'blacklisted'
}
