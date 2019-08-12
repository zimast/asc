import { Request, Response } from "express";
import { database } from "./database";
import * as argon2 from 'argon2';
import { DatabaseUser } from "./database-user";
import { HTTP_STATUS_CODES } from './http-status-codes';

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
        const sessionToken = await attemptLogin(credentials, user);
        console.log("Login successful");
        response.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
        response.status(HTTP_STATUS_CODES.success).json({ id: user.id, email: user.email });
    }
    catch (error) {
        console.log("Login failed!");
        response.sendStatus(HTTP_STATUS_CODES.forbidden);
    }
}

async function attemptLogin(credentials: any, user: DatabaseUser) {
    const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);
    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }

    //TODO return JWT
    return 1;
}