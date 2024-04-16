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