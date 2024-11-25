import { Request, Response, NextFunction } from 'express';
declare const signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const signIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { signUp, signIn, logout };
