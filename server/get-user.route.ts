import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { database } from './database';

export function getUser(request: Request, response: Response) {

    const user = database.findUserById(request['userId']);

    if (user) {
        response.status(HTTP_STATUS_CODES.success).json(user);
    } else {
        response.sendStatus(HTTP_STATUS_CODES.no_content);
    }
}
