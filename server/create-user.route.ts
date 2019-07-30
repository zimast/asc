import { Request, Response } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { USERS } from './database-data';

export function createUser(request: Request, response: Response) {
  const credentials: any = request.body;
  const user = database.createUser(credentials.email, credentials.password);
  console.log(USERS);
  response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email });
}
