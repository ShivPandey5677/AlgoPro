// Step 1: Generate an elliptic curve (EC) key pair
import fs from 'fs';
import crypto from 'crypto';
export function EECEncrypt(filePath){
// const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
//     namedCurve: 'secp256k1',
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'sec1',
//       format: 'pem'
//     }
//   });
 const data=fs.readFileSync(`public/uploads/${filePath}`)
  
  // Step 2: Generate a symmetric encryption key (e.g., AES key)
 const symmetricKey = crypto.randomBytes(32); // 256-bit key
  
  // Step 3: Encrypt the data using the symmetric encryption key
   // Plain text to be encrypted
  const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, crypto.randomBytes(16));
  let encryptedData = cipher.update(data, 'utf8', 'base64');
  encryptedData += cipher.final('base64');
  
  const encryptedObject = {
    type:"EEC",
    key: key.toString('hex'),
    encryptedData: encryptedData.toString('hex')
};
const encryptedFilePath = `public/downloads/E${filePath}`;
fs.writeFileSync(encryptedFilePath, JSON.stringify(encryptedObject));

return encryptedFilePath
  // Step 5: Store both the encrypted data and the encrypted symmetric encryption key
 
}
export function EECDecrypt(filePath){
  const encryptedObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptedObject.symmetricKey, Buffer.alloc(16));
  let decryptedData = decipher.update(Buffer.from(encryptedObject.encryptedData, 'hex'), 'base64', 'utf8');
  decryptedData += decipher.final('utf8');
  const decryptedFilePath = `public/downloads/D${filePath}`;
fs.writeFileSync(decryptedFilePath, JSON.stringify(decryptedData));
  return decryptedFilePath;
}
  