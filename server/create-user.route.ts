import { Request, Response } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import * as argon2 from 'argon2';
import { validatePassword } from './password-validator';
import { createSessionToken, createCsrfToken } from './security.utils';

export function createUser(request: Request, response: Response) {
  const credentials: any = request.body;
  const errors = validatePassword(credentials.password);

  if (errors.length) {
    response.status(HTTP_STATUS_CODES.bad_request).json({ errors });
  } else {
    createUserAndSession(response, credentials)
      .catch(() => response.sendStatus(HTTP_STATUS_CODES.internal_server_error))
  }
}

async function createUserAndSession(response: Response, credentials) {
  const passwordDigest = await argon2.hash(credentials.password);
  const user = database.createUser(credentials.email, passwordDigest);

  const sessionToken = await createSessionToken(user.id.toString());
  const csrfToken = await createCsrfToken(sessionToken);

  response.cookie('SESSIONID', sessionToken, { httpOnly: true, secure: true });
  response.cookie('XSRF-TOKEN', csrfToken);
  response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email });
}
