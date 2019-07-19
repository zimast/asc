import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function checkIfAuthorized(allowedRoles: string[], request: Request, response: Response, next: NextFunction) {
  const userInfo = request['user'];
  const roles = _.intersection(userInfo.roles, allowedRoles);

  if (roles.length > 0) {
    next();
  } else {
    response.sendStatus(HTTP_STATUS_CODES.forbidden);
  }
}
