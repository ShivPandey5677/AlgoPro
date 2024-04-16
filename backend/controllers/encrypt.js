import {data} from "./index.js"
// //AES
// import crypto from "crypto"

// // Plain text to be encrypted


// // Encryption key and initialization vector (IV)
// const key = crypto.randomBytes(32); // 256-bit key
// const iv = crypto.randomBytes(16); // 128-bit IV

// // Create AES cipher object
// const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

// // Encrypt the text
// let encryptedText = cipher.update(data, 'utf8', 'hex');
// encryptedText += cipher.final('hex');

// console.log('Encrypted Text:', encryptedText);

//RSA
import crypto from "crypto"

// // Plain text to be encrypted


// // Generate RSA key pair
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: 'pkcs1',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs1',
//     format: 'pem'
//   }
// });

// // Encrypt the text using the public key
// const encryptedText2 = crypto.publicEncrypt(
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_PADDING
//   },
//   Buffer.from(data)
// ).toString('base64');

// console.log('Encrypted Text:', encryptedText2);
// //DHKE

// // Shared prime number and generator
// const prime = crypto.createDiffieHellman(2048);
// const generator = prime.getGenerator();

// // Generate private and public keys for Alice
// const alicePrivate = prime.generateKeys();
// const alicePublic = prime.getPublicKey();

// // Generate private and public keys for Bob
// const bobPrivate = prime.generateKeys();
// const bobPublic = prime.getPublicKey();

// // Exchange public keys
// const aliceSecret = prime.computeSecret(bobPublic);
// const bobSecret = prime.computeSecret(alicePublic);

// console.log('Alice Secret:', aliceSecret.toString('hex'));
// console.log('Bob Secret:', bobSecret.toString('hex'));
//ECC

// const crypto = require('crypto');

// Step 1: Generate an elliptic curve (EC) key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
  namedCurve: 'secp256k1',
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'sec1',
    format: 'pem'
  }
});

// Step 2: Generate a symmetric encryption key (e.g., AES key)
const symmetricKey = crypto.randomBytes(32); // 256-bit key

// Step 3: Encrypt the data using the symmetric encryption key
 // Plain text to be encrypted
const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, crypto.randomBytes(16));
let encryptedData = cipher.update(data, 'utf8', 'base64');
encryptedData += cipher.final('base64');

// Step 4: Encrypt the symmetric encryption key using the public key of the EC key pair
// const encryptedSymmetricKey = crypto.publicEncrypt(
//   {
//     key: publicKey,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
//   },
//   symmetricKey
// ).toString('base64');

// Step 5: Store both the encrypted data and the encrypted symmetric encryption key
console.log('Encrypted Data:', encryptedData);
console.log('Symmetric Key:',symmetricKey);
