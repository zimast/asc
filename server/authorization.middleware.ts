import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function checkIfAuthorized(allowedRoles: string[], request: Request, response: Response, nextFunction: NextFunction) {

    const userInfo = request['user'];
    const roles = _.intersection(userInfo.roles, allowedRoles);

    if (roles.length > 0) {
        nextFunction();
    } else {
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }

}
