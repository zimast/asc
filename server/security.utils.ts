// import { DatabaseUser } from './database-user';

// const util = require('util');
// const randomBytes = util.promisify(require('crypto').randomBytes);

// export async function createCsrfToken() {
//   return await randomBytes(32).then(bytes => bytes.toString('hex'));
// }

// export async function createSessionToken(user: DatabaseUser) {
//   return signJwt({
//     roles: user.roles
//   },
//     RSA_PRIVATE_KEY, {
//       algorithm: 'RS256',
//       expiresIn: 7200,
//       subject: user.id.toString()
//     });
// }

// import * as jwt from 'jsonwebtoken';
// import * as fs from "fs";
// import * as argon2 from 'argon2';
// import { DbUser } from "./db-user";


// export const randomBytes = util.promisify(crypto.randomBytes);

// export const signJwt = util.promisify(jwt.sign);


// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

// const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

// const SESSION_DURATION = 1000;


export async function decodeJSONwebToken(jsonWebToken: string) {

  const payload = await jwt.verify(jsonWebToken, RSA_PUBLIC_KEY);

  console.log('decoded JWT payload', payload);

  return payload;
}














