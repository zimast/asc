import { Request, Response } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function getUser(request: Request, response: Response) {

  const userInfo: any = request['user'];

  if (userInfo) {
    const user = database.findUserById(userInfo.sub);
    response.status(HTTP_STATUS_CODES.success).json({ email: user.email, id: user.id, roles: user.roles });
  } else {
    response.sendStatus(HTTP_STATUS_CODES.no_content);
  }
}
