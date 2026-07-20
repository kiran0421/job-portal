import crypto from 'node:crypto';

const randomID = crypto.randomUUID();
console.log(randomID);

const randomBytes = crypto.randomBytes(16).toString('hex');
console.log(randomBytes);

const hash = crypto.createHash('sha256').update('Hello, World!').digest('hex');
console.log(hash);

const hmac = crypto.createHmac('sha256', 'my-secret-key').update('Hello, World!').digest('hex');
console.log(hmac);