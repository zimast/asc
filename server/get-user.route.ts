import { Request, Response } from 'express';
import { sessionStore } from './session-store';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function getUser(request: Request, response: Response) {

    const sessionId = request.cookies['SESSIONID'];
    const user = sessionStore.findUserBySessionId(sessionId);

    if (user) {
        response.status(HTTP_STATUS_CODES.success).json(user);
    } else {
        response.status(HTTP_STATUS_CODES.no_content)
    }
}