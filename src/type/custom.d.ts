// src/types/custom.d.ts
import { Request } from 'express'

// Extend the Express Request type to include the 'user' property
declare global {
  namespace Express {
    export interface Request {
      user?: any // You can replace 'any' with a more specific type if needed
    }
    export interface Response {
      user: any
    }
  }
}
