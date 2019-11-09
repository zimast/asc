import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function checkIfAuthenticated(request: Request, response: Response, next: NextFunction) {

    if (request['userId']) {
        next();
    } else {
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }

}