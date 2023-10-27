const crypto = require('crypto');

const options = {
  namedCurve: "secp256k1",
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
};

let isVerified;

console.log("--------------------------------------------");
console.log("Begin valid signature scenario");

const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", options);
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);


//------------------ Mock Transmission Start ------------------//
console.log("Sender sends PUBLIC KEY to recipient");
//------------------ Mock Transmission End ------------------//

// sender wants to send a new message
const message = "this is a secret message";
console.log("Message:", message);

const data = Buffer.from(message);
const signature = crypto.sign("sha256", data, privateKey);
console.log("Signature:", signature.toString("hex"));

//------------------ Mock Transmission Start ------------------//
console.log("Sender sends MESSAGE (DATA) and SIGNATURE to recipient");
//------------------ Mock Transmission End ------------------//

// recipient verifies signature
isVerified = crypto.verify("sha256", data, publicKey, signature);
console.log("ECDSA signature verified:", isVerified);

console.log("--------------------------------------------");
console.log("Begin invalid signature scenario");

// attacker creates new key (fake key)
const { publicKey: fakePublicKey, privateKey: fakePrivateKey } = crypto.generateKeyPairSync("ec", options);
console.log("Private Key:", fakePrivateKey);
console.log("Public Key:", fakePublicKey);

// attacker creates signature for the same MESSAGE using fake key
const fakeSignature = crypto.sign("sha256", data, fakePrivateKey);
console.log("Signature:", fakeSignature.toString("hex"));

//------------------ Mock Transmission Start ------------------//
console.log("Attacker sends MESSAGE (DATA) and FAKE SIGNATURE to recipient");
//------------------ Mock Transmission End ------------------//

// recipient verifies signature
isVerified = crypto.verify("sha256", data, publicKey, fakeSignature);
console.log("ECDSA signature verified:", isVerified);
