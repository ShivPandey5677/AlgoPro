**File Encryption & Decryption Utility**

**Overview**

This project provides a utility for encrypting and decrypting files using various encryption techniques, including AES (Advanced Encryption Standard) and ECC (Elliptic Curve Cryptography) and RSA.

Additionally, it includes functionality for compressing and decompressing files using Huffman coding. 

The project is designed to ensure secure file handling, with encrypted files stored in a secure format.








**Features**
**AES Encryption/Decryption:**

  Uses AES-256-CBC for secure file encryption.

  Generates a 256-bit key and a 128-bit initialization vector (IV).

  Encrypts the file data and saves the encrypted output.

  Decrypts the file data using the stored key and IV.

**ECC Encryption/Decryption:**

  Uses Elliptic Curve Cryptography to generate a symmetric key.

  Encrypts file data with AES-256-CBC and stores it securely.

  Decrypts file data using the stored key and IV.

**Huffman Compression/Decompression:**

  Compresses file data using Huffman coding to reduce file size.

  Decompresses Huffman-encoded files back to their original form.









**Installation and Setup
**
  Prerequisites

  Node.js (v12+)
