import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function logout(request: Request, response: Response) {
    response.clearCookie("SESSIONID");
    response.status(HTTP_STATUS_CODES.success).json({ message: 'Logout Successful' });
}