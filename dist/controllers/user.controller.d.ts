import { NextFunction, Request, Response } from 'express';
declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { getUsers };
