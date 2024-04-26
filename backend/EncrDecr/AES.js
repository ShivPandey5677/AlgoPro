import crypto from "crypto";
import fs from "fs";

export function AESEncrypt(filePath) {
    // Read data from the file
    // const filePath="a.txt"
    const fileAdd=`public/uploads/${filePath}`
    console.log(fileAdd)
    const data = fs.readFileSync(fileAdd);

    // Encryption key and initialization vector (IV)
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16); // 128-bit IV

    // Create AES cipher object
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the data
    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    const encryptedObject = {
        key: key.toString('hex'),
        iv: iv.toString('hex'),
        encryptedData: encryptedData.toString('hex')
    };
    // Create a new file name with the prefix 'E'
    const encryptedFilePath = `public/downloads/E${filePath}`;
    fs.writeFileSync(encryptedFilePath, JSON.stringify(encryptedObject));
    
   return encryptedFilePath

}
// DECRYPTION
// const decrObject = JSON.parse(fs.readFileSync(encryptedFilePath))
// const key1 = Buffer.from(decrObject.key, 'hex');
// const iv1 = Buffer.from(decrObject.iv, 'hex');
// const decrData = Buffer.from(decrObject.encryptedData, 'hex');
// // Encrypted text
// ; // Insert the encrypted text here

// // Encryption key and initialization vector (IV)
// // const key1 = Buffer.from(decrdata, 'hex'); // Insert the key in hexadecimal format
// // const iv1 = Buffer.from(decrdata, 'hex'); // Insert the IV in hexadecimal format

// // Create AES decipher object
// const decipher = crypto.createDecipheriv('aes-256-cbc', key1, iv1);

// // Decrypt the text
// let decryptedText = decipher.update(decrData);
// decryptedText += decipher.final();

// console.log('Decrypted Text:', decryptedText);