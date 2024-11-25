import { Response } from 'express';
declare class ApiResponse {
    status: number;
    data?: any;
    message: string;
    constructor(status: number, data: any, message: string);
    send(res: Response): void;
}
export default ApiResponse;
