import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { database } from './database';
import { createSessionToken } from './security.utils';

export function loginAsUser(request: Request, response: Response, nextFunction: NextFunction) {

    const impersonatedUserEmail = request.body.email;
    const impersonatedUser = database.findUserByEmail(impersonatedUserEmail);

    createSessionToken(impersonatedUser)
        .then(sessionToken => {

            response.cookie('SESSIONID', sessionToken, { httpOnly: true, secure: true });
            response.status(HTTP_STATUS_CODES.success).json({
                id: impersonatedUser.id,
                email: impersonatedUser.email,
                roles: impersonatedUser.roles
            });

        })
        .catch(error => {
            console.log('Error trying to log in as user: ', error);
            response.sendStatus(HTTP_STATUS_CODES.internal_server_error);
        });

}
