import * as fs from "fs";

const util = require('util');
const crypto = require('crypto');

export const randomBytes = util.promisify(crypto.randomBytes);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');
const SESSION_DURATION = 240;