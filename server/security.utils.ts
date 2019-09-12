import * as fs from "fs";

const util = require('util');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

export const randomBytes = util.promisify(crypto.randomBytes);
export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');
const SESSION_DURATION = 240;

export async function createSessionToken(userId: string) {

    return await signJwt({}, RSA_PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: 240,
        subject: userId
    });

}