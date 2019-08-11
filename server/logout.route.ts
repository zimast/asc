import { Request, Response } from 'express';
import { sessionStore } from './session-store';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function logout(request: Request, response: Response) {
    const sessionId = request.cookies['SESSIONID'];
    sessionStore.destroySession(sessionId);
    response.clearCookie('SESSIONID');
    response.sendStatus(HTTP_STATUS_CODES.no_content);
}