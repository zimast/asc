import { Request, Response, NextFunction } from 'express';
import { decodeJsonWebToken } from './security.utils';

export function retrieveUserIdFromRequest(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const jsonWebToken: string = request.cookies['SESSIONID'];

    if (jsonWebToken) {
        handleSessionCookie(jsonWebToken, request)
            .then(() => next())
            .catch((error) => {
                console.error(error);
                next();
            });
    } else {
        next();
    }
}

async function handleSessionCookie(jsonWebToken: string, request: Request) {
    try {
        const jsonWebTokenPayload = await decodeJsonWebToken(jsonWebToken);
        request['user'] = jsonWebTokenPayload;
    } catch (error) {
        console.log('Error: Could not extract user from request', error.message);
    }

}
