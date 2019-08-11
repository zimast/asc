import { Request, Response } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import * as argon2 from 'argon2';
import { DatabaseUser } from './database-user';
import { randomBytes } from './security.utils';
import { sessionStore } from './session-store';

export function login(request: Request, response: Response) {
    const credentials = request.body;
    const user = database.findUserByEmail(credentials.email);

    if (!user) {
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    } else {
        loginAndBuildResponse(credentials, user, response);
    }
}

async function loginAndBuildResponse(credentials: any, user: DatabaseUser, response: Response) {
    try {
        const sessionId = await attemptLogin(credentials, user);
        console.log('Login success');
        response.cookie('SESSIONID', sessionId, { httpOnly: true, secure: true});
        response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email });
    } catch (error) {
        console.log('Login Failed');
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }
}

async function attemptLogin(credentials: any, user: DatabaseUser) {
    const isPasswordValid = await argon2.verify(
        user.passwordDigest, 
        credentials.password
    );

    // TODO: what about email ?
    if (!isPasswordValid) {
        throw new Error('Password invalid!');
    }

    const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
    console.log('SessionId: ', sessionId);
    sessionStore.createSession(sessionId, user);

    return sessionId;
}