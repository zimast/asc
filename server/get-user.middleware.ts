import { decodeJsonWebToken } from './security.utils';
import { Request, Response, NextFunction } from 'express';

export function retrieveUserIdFromRequest(request: Request, response: Response, next: NextFunction) {

  const jsonWebToken = request.cookies['SESSIONID'];

  if (jsonWebToken) {
    handleSessionCookie(jsonWebToken, request)
      .then(() => next())
      .catch(error => {
        console.error(error);
        next();
      });
  } else {
    next();
  }
}

async function handleSessionCookie(jsonWebToken: string, request: Request) {
  try {
    const payload = await decodeJsonWebToken(jsonWebToken);
    request['user'] = payload;
  } catch (error) {
    console.error('Error: Could not extract user from request:', error.message);
  }
}






