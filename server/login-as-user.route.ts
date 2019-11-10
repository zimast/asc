import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function loginAsUser(request: Request, response: Response, nextFunction: NextFunction) {

    response
        .status(HTTP_STATUS_CODES.success)
        .json({
            id: 1,
            email: 'temp@gmail.com',
            roles: ['STUDENT']
        });

}
