import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from './http-status-codes';


export function checkCsrfToken(request: Request, response: Response, next: NextFunction) {
    const csrfCookie = request.cookies['XSRF-TOKEN'];
    const csrfHeader = request.headers['x-xsrf-token'];

    if (csrfCookie && csrfHeader && csrfCookie === csrfHeader) {
        next();
    } else {
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }
}
