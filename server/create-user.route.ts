import { Request, Response } from 'express';
import { validatePassword } from './password-validation';
import { HTTP_STATUS_CODES } from './http-status-codes';
import * as argon2 from 'argon2';
import { database } from './database';
import { createSessionToken, createCsrfToken } from './security.utils';

export function createUser(request: Request, response: Response) {
  const credentials: any = request.body;
  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    response.status(HTTP_STATUS_CODES.bad_request).json({ errors });
  } else {
    createUserAndSession(response, credentials)
      .catch((error) => {
        console.error('Error creating new user', error);
        response.sendStatus(HTTP_STATUS_CODES.internal_server_error);
      });
  }

}

async function createUserAndSession(response: Response, credentials) {
  const passwordDigest = await argon2.hash(credentials.password);
  const user = database.createUser(credentials.email, passwordDigest);
  const sessionToken = await createSessionToken(user);
  const csrfToken = await createCsrfToken();

  response.cookie('SESSIONID', sessionToken, { httpOnly: true, secure: true });
  response.cookie('XSRF-TOKEN', csrfToken);

  response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email, roles: user.roles });
}
