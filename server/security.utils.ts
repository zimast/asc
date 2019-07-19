import { DatabaseUser } from './database-user';

const util = require('util');
const fileSystem = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const signJsonWebToken = util.promisify(jsonwebtoken.sign);
const randomBytes = util.promisify(require('crypto').randomBytes);

const RSA_PUBLIC_KEY = fileSystem.readFileSync('./demos/public.key');
const RSA_PRIVATE_KEY = fileSystem.readFileSync('./demos/private.key');

export async function decodeJsonWebToken(token: string) {
  const payload = jsonwebtoken.verify(token, RSA_PUBLIC_KEY);
  console.log('[security.utils.ts][decodeJsonWebToken] Decoded Json Web Token payload', payload);
  return payload;
}

export async function createSessionToken(databaseUser: DatabaseUser) {
  return signJsonWebToken({
    roles: databaseUser.roles
  },
    RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 7200,
      subject: databaseUser.id.toString()
    });
}

export async function createCsrfToken() {
  return await randomBytes(32).then(bytes => bytes.toString('hex'));
}
