import { Request, Response } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { USERS } from './database-data';
import * as argon2 from 'argon2';

export function createUser(request: Request, response: Response) {
  const credentials: any = request.body;
  argon2.hash(credentials.password).then((passwordDigest: any) => {
    const user = database.createUser(credentials.email, passwordDigest);
    console.log(USERS);
    response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email });
  });
}
