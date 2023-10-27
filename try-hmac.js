const crypto = require('crypto');

/**
 * The inner working of symmetric digital signature is
 * similar to how we generate and handle HASH.
 */

let recipientSignature, isVerified;

console.log("--------------------------------------------");
console.log("Begin valid signature scenario");

// sender generates key
const key = crypto.generateKeySync("hmac", { length: 128 });
console.log("Key:", key.export().toString("hex"));

//------------------ Mock Transmission Start ------------------//
console.log("Sender sends KEY to recipient");
//------------------ Mock Transmission End ------------------//

// sender wants to send a new message
const message = "this is a secret message";
console.log("Message:", message);

// sender creates signature
const signature = crypto.createHmac("sha256", key).update(message).digest("hex");
console.log("Signature:", signature);

//------------------ Mock Transmission Start ------------------//
console.log("Sender sends MESSAGE and SIGNATURE to recipient");
//------------------ Mock Transmission End ------------------//

// recipient creates new signature using the previously shared KEY
recipientSignature = crypto.createHmac("sha256", key).update(message).digest("hex");
// recipient compares if the signature from sender
// is the same with the signature that recipient generates
isVerified = (recipientSignature == signature);
console.log("HMAC signature verified:", isVerified);

console.log("--------------------------------------------");
console.log("Begin invalid signature scenario");

// attacker creates new key (fake key)
const fakeKey = crypto.generateKeySync("hmac", { length: 128 });
console.log("Key:", fakeKey.export().toString("hex"));

// attacker creates signature for the same MESSAGE using fake key
const fakeSignature = crypto.createHmac("sha256", fakeKey).update(message).digest("hex");
console.log("Signature:", fakeSignature);

//------------------ Mock Transmission Start ------------------//
console.log("Attacker sends MESSAGE and FAKE SIGNATURE to recipient");
//------------------ Mock Transmission End ------------------//

// recipient creates new signature using the previously shared KEY
recipientSignature = crypto.createHmac("sha256", key).update(message).digest("hex");
// recipient compares if the signature from sender
// is the same with the signature that recipient generates
isVerified = (recipientSignature == fakeSignature);
console.log("HMAC signature verified:", isVerified);
