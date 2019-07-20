import { Request, Response } from "express";
import { database } from "./database";
import { HTTP_STATUS_CODES } from './http-status-codes';
import { DatabaseUser } from './database-user';
import * as argon2 from 'argon2';
import { createSessionToken, createCsrfToken } from './security.utils';

export function login(request: Request, response: Response) {
    const credentials: any = request.body;
    const user = database.findUserByEmail(credentials.email);

    if (!user) {
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    } else {
        loginAndBuildResponse(credentials, user, response);
    }
}

async function loginAndBuildResponse(credentials: any, user: DatabaseUser, response: Response) {
    try {
        const sessionToken = await attemptLogin(credentials, user);
        const csrfToken = await createCsrfToken();

        console.log("Login successful");

        response.cookie('SESSIONID', sessionToken, { httpOnly: true, secure: true });
        response.cookie('XSRF-TOKEN', csrfToken);
        response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email, roles: user.roles });
    }
    catch (error) {
        console.error("Login failed:", error);
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }
}

async function attemptLogin(credentials: any, user: DatabaseUser) {
    const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);
    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }
    return createSessionToken(user);
}
