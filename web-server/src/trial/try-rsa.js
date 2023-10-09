const crypto = require('crypto');

// senders prepare input
const message = "this is a secret message";
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// senders create signature
const signature = crypto.sign("sha256", Buffer.from(message), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PSS_PADDING
});

console.log("Message:", message);
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Signature:", signature.toString("hex"));

// public key, message, and signature is transmitted to recipients
// then...

// recipients verify signature
const isVerified = crypto.verify(
  "sha256",
  Buffer.from(message),
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  },
  signature
);
console.log("RSA signature verified:", isVerified);
