import { NextFunction } from 'express';
interface JWTPayload {
    id: number;
    email: string;
}
declare const signToken: (payload: JWTPayload) => string;
declare const decodeToken: (token: string, next: NextFunction) => any;
export { signToken, decodeToken };
