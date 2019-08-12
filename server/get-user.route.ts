import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from './http-status-codes';

export function getUser(request: Request, response: Response) {

    //TODO retrieve the actual user based on JWT content
    const user = {
        email: 'test@gmail.com'
    };

    if (user) {
        response.status(HTTP_STATUS_CODES.success).json(user);
    }
    else {
        response.sendStatus(HTTP_STATUS_CODES.no_content);
    }
}
