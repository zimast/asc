import * as fs from 'fs';
import * as argon2 from 'argon2';
import { DatabaseUser } from './database-user';

const util = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export const randomBytes = util.promisify(crypto.randomBytes);
export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');
const SESSION_DURATION = 1000;

export async function createSessionToken(user: DatabaseUser) {

    return await signJwt(
        {
            roles: user.roles
        },
        RSA_PRIVATE_KEY,
        {
            algorithm: 'RS256',
            expiresIn: SESSION_DURATION,
            subject: user.id.toString()
        }
    );

}

export async function decodeJsonWebToken(jsonWebToken: string) {
    const payload = await jwt.verify(jsonWebToken, RSA_PUBLIC_KEY);
    console.log('decoded Json Web Token payload', payload);
    return payload;
}

export async function createCsrfToken(sessionToken: string) {
    return argon2.hash(sessionToken);
}
