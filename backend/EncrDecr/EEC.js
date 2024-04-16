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
  