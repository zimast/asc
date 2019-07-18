import { decodeJsonWebToken } from './security.utils';
import { Request, Response, NextFunction } from 'express';

export function retrieveUserIdFromRequest(request: Request, response: Response, next: NextFunction) {

  const jsonWebToken = request.cookies['SESSIONID'];

  if (jsonWebToken) {
    handleSessionCookie(jsonWebToken, request)
      .then(() => next())
      .catch(err => {
        console.error(err);
        next();
      })
  } else {
    next();
  }
}



async function handleSessionCookie(jwt: string, req: Request) {
  try {

    const payload = await decodeJsonWebToken(jwt);

    req['user'] = payload;

  }
  catch (err) {
    console.log('Error: Could not extract user from request:', err.message);
  }
}






