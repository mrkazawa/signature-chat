const crypto = require('crypto');

// senders prepare input
const message = "this is a secret message";
const key = crypto.generateKeySync("hmac", { length: 128 });

// senders create signature
const signature = crypto.createHmac("sha256", key).update(message).digest("hex");

console.log("Message:", message);
console.log("Key:", key.export().toString("hex"));
console.log("Signature:", signature);

// key, message, and signature is transmitted to recipients
// then...

// recipients verify signature
const recipientSignature = crypto.createHmac("sha256", key).update(message).digest("hex");
const isVerified = (recipientSignature == signature);
console.log("HMAC signature verified:", isVerified);
