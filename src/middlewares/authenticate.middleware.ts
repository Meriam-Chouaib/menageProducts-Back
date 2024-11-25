import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Make sure the return type is void
  const token = req.headers.authorization?.split(' ')[1] // Get the token from header (Bearer token)

  if (!token) {
    // If no token, send the response and return to prevent further code execution
    res.status(401).json({ message: 'No token provided, authorization denied' })
    return
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      // If there's an error with the token, send the response and return
      res.status(401).json({ message: 'Invalid or expired token' })
      return
    }

    // Attach the decoded user to the request object
    req.body = decoded

    // Call next to move to the next middleware or route handler
    next()
  })
}
