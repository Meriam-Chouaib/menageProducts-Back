// src/types/express/index.d.ts
declare namespace Express {
  interface Request {
    user?: any // or a more specific type depending on your decoded JWT data
  }
}
