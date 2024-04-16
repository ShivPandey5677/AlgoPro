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