import { Request, Response, NextFunction } from 'express';
import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function userInfo(request: Request | any, response: Response) {

    const userInfoData = request.user;
    console.log('Checking if user exists: ', userInfoData);
    let user = database.findUserByEmail(userInfoData.email);

    if (!user) {
        user = database.createUser(userInfoData.email, userInfoData.sub);
    }

    response.status(HTTP_STATUS_CODES.success).json({ email: user.email });

}
