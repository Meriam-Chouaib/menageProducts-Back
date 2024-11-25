import { User } from '@prisma/client';
import ApiResponse from '@app/utils/ApiResponse';
import ApiError from '@app/errors/ApiError';
declare const signup: (data: User) => Promise<ApiResponse>;
declare const signin: (email: string, password: string) => Promise<ApiResponse | ApiError>;
declare const logout: (token: string) => Promise<ApiResponse>;
export { signup, signin, logout };
