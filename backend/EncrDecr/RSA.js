// // Generate RSA key pair
import fs from 'fs';
import crypto from 'crypto';
export function RSAEncrypt(filePath){
    const data=fs.readFileSync(`public/uploads/${filePath}`)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
});

// Encrypt the text using the public key
const encryptedText2 = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  },
  Buffer.from(data)
).toString('base64');
const encryptedObject={
    type:"RSA",
    key:[publicKey,privateKey],
    encryptedData:encryptedText2
}
const encryptedFilePath=`public/downloads/E${filePath}`
fs.writeFileSync(encryptedFilePath,JSON.stringify(encryptedObject))
return encryptedFilePath;
}

export function RSADecrypt(filePath){
// // Encrypted text
// const encryptedText = '...'; // Insert the base64-encoded encrypted text here
const encryptedObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
// // Private key
const privateKey = encryptedObject.key[1];
const encryptedData=encryptedObject.encryptedData;

// // Decrypt the text using the private key
const decryptedText = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  },
  Buffer.from(encryptedData, 'base64')
).toString('utf8');
const decryptedFilePath = `public/downloads/D${filePath}`;
fs.writeFileSync(decryptedFilePath, JSON.stringify(decryptedText));
// console.log('Decrypted Text:', decryptedText);
return decryptedFilePath
}