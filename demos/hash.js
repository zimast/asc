const crypto = require('crypto');
const password = 'monkey';
const hash = crypto.createHash('sha256').update(password).digest('hex');

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");