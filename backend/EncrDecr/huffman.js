import fs from "fs"
import path from "path"

class Node {
    constructor(frequency, character, left = null, right = null) {
      this.frequency = frequency;
      this.character = character;
      this.left = left;
      this.right = right;
    }
  }

  function createAndBuildMin_Heap(characters, frequencies, size) {
    let minHeap = [];
    for (let i = 0; i < size; i++) {
      minHeap.push(new Node(frequencies[i], characters[i]));
    }
    buildMinHeap(minHeap, size);
    return minHeap;
  }

  function buildMinHeap(minHeap, size) {
    for (let i = Math.floor(size / 2); i >= 0; i--) {
      minHeapify(minHeap, size, i);
    }
  }

  function minHeapify(minHeap, size, index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let min = index;

    if (left < size && minHeap[left].frequency < minHeap[min].frequency) {
      min = left;
    }

    if (right < size && minHeap[right].frequency < minHeap[min].frequency) {
      min = right;
    }

    if (min !== index) {
      let temp = minHeap[index];
      minHeap[index] = minHeap[min];
      minHeap[min] = temp;
      minHeapify(minHeap, size, min);
    }
  }

  function buildHuffmanTree(characters, frequencies, minHeap) {
    while (minHeap.length > 1) {
      let node1 = minHeap.shift();
      let node2 = minHeap.shift();

      let newNode = new Node(node1.frequency + node2.frequency, null, node1, node2);
      minHeap.push(newNode);

      buildMinHeap(minHeap, minHeap.length);
    }

    return minHeap[0];
  }

  function generateCodes(node, prefix = '', codes = {}) {
    if (node == null) return;
    if (node.character != null) {
        codes[node.character] = prefix;
        return;
    }
    generateCodes(node.left, prefix + '0', codes);
    generateCodes(node.right, prefix + '1', codes);
}


// function compress(inputFile, outputFile, tree) {
//     const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
//     const outputStream = fs.createWriteStream(outputFile, { encoding: 'binary' });

//     let currentByte = '';

//     inputStream.on('data', (chunk) => {
//         for (let i = 0; i < chunk.length; i++) {
//             const char = chunk[i];
//             const code = tree[char];
//             if (code !== undefined) {
//                 currentByte += code;
//                 // If the currentByte is a full byte, write it to the output stream
//                 while (currentByte.length >= 8) {
//                     const byte = currentByte.substring(0, 8);
//                     const byteBuffer = Buffer.from(byte, 'binary');
//                     outputStream.write(byteBuffer);
//                     currentByte = currentByte.substring(8);
//                 }
//             } else {
//                 console.error(`Character '${char}' does not have a Huffman code.`);
//             }
//         }
//     });

//     inputStream.on('end', () => {
//         // If there are remaining bits in currentByte, pad them with zeros and write to the output stream
//         if (currentByte.length > 0) {
//             const padding = 8 - currentByte.length;
//             currentByte += '0'.repeat(padding);
//             const byteBuffer = Buffer.from(currentByte, 'binary');
//             outputStream.write(byteBuffer);
//         }
//         outputStream.end();
//     });
// }
// function compress(inputFile, outputFile, tree, codes) {
//   const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
//   const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

//   // Write the Huffman codes to the output file
//   const codesString = JSON.stringify(codes);
//   if (!codesString) {
//       console.error("Error: Unable to stringify Huffman codes.");
//       return;
//   }
//   const codesLength = Buffer.alloc(4);
//   codesLength.writeUInt32BE(codesString.length);
//   console.log("Writing Huffman codes length:", codesString.length);
//   outputStream.write(codesLength);
//   console.log("Writing Huffman codes:", codesString);
//   const codesBuffer = Buffer.from(codesString, 'utf8');
//   outputStream.write(codesBuffer);

//   let currentByte = '';

//   inputStream.on('data', (chunk) => {
//       for (let i = 0; i < chunk.length; i++) {
//           const char = chunk[i];
//           const code = tree[char];
//           if (code !== undefined) {
//               currentByte += code;
//               // If the currentByte is a full byte, write it to the output stream
//               while (currentByte.length >= 8) {
//                   const byte = currentByte.substring(0, 8);
//                   const byteBuffer = Buffer.from(byte, 'binary');
//                   outputStream.write(byteBuffer);
//                   currentByte = currentByte.substring(8);
//               }
//           } else {
//               console.error(`Character '${char}' does not have a Huffman code.`);
//           }
//       }
//   });

//   inputStream.on('end', () => {
//       // If there are remaining bits in currentByte, pad them with zeros and write to the output stream
//       if (currentByte.length > 0) {
//           const padding = 8 - currentByte.length;
//           currentByte += '0'.repeat(padding);
//           const byteBuffer = Buffer.from(currentByte, 'binary');
//           outputStream.write(byteBuffer);
//       }
//       // Include the compressed data as a property of the object of codes under the "data" key
//       codes.data = currentByte;
//       outputStream.end();
//   });
// }

function compress(inputFile, outputFile, tree, codes) {
  const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  let compressedData = ''; // Variable to store compressed data

  // Compress the input text
  inputStream.on('data', (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
          const char = chunk[i];
          const code = tree[char];
          if (code !== undefined) {
              compressedData += code;
          } else {
              console.error(`Character '${char}' does not have a Huffman code.`);
          }
      }
  });

  inputStream.on('end', () => {
      // Write the Huffman codes and compressed data to the output file
      const compressedObject = { ...codes, data: compressedData }; // Include the compressed data in the object
      const compressedString = JSON.stringify(compressedObject);
      outputStream.write(compressedString);
      outputStream.end();
  });
}

// function compress(inputFile, outputFile, tree, codes) {
//     const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
//     const outputStream = fs.createWriteStream(outputFile, { encoding: 'binary' });

//     // Write the Huffman codes to the output file
//     const codesString = JSON.stringify(codes);
//     if (!codesString) {
//         console.error("Error: Unable to stringify Huffman codes.");
//         return;
//     }
//     const codesLength = Buffer.alloc(4);
//     codesLength.writeUInt32BE(codesString.length);
//     console.log("Writing Huffman codes length:", codesString.length);
//     outputStream.write(codesLength);
//     console.log("Writing Huffman codes:", codesString);
//     const codesBuffer = Buffer.from(codesString, 'utf8');
//     outputStream.write(codesBuffer);

//     let currentByte = '';

//     inputStream.on('data', (chunk) => {
//         for (let i = 0; i < chunk.length; i++) {
//             const char = chunk[i];
//             const code = tree[char];
//             if (code !== undefined) {
//                 currentByte += code;
//                 // If the currentByte is a full byte, write it to the output stream
//                 while (currentByte.length >= 8) {
//                     const byte = currentByte.substring(0, 8);
//                     const byteBuffer = Buffer.from(byte, 'binary');
//                     outputStream.write(byteBuffer);
//                     currentByte = currentByte.substring(8);
//                 }
//             } else {
//                 console.error(`Character '${char}' does not have a Huffman code.`);
//             }
//         }
//     });

//     inputStream.on('end', () => {
//         // If there are remaining bits in currentByte, pad them with zeros and write to the output stream
//         if (currentByte.length > 0) {
//             const padding = 8 - currentByte.length;
//             currentByte += '0'.repeat(padding);
//             const byteBuffer = Buffer.from(currentByte, 'binary');
//             outputStream.write(byteBuffer);
//         }
//         outputStream.end();
//     });
// }
// function decompress(inputFile, outputFile) {
//     const inputStream = fs.createReadStream(inputFile, { encoding: 'binary' });
//     const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

//     let codesLengthBuffer = Buffer.alloc(4);
//     let codesLength = 0;
//     let codesString = '';
//     let decodedString = '';

//     // Read the length of Huffman codes from the compressed file
//     inputStream.on('data', (chunk) => {
//         if (codesLengthBuffer.length < 4) {
//             const remainingBytes = 4 - codesLengthBuffer.length;
//             codesLengthBuffer = Buffer.concat([codesLengthBuffer, chunk.slice(0, remainingBytes)], codesLengthBuffer.length + remainingBytes);
//             chunk = chunk.slice(remainingBytes);
//         }
//         if (codesLengthBuffer.length === 4 && codesLength === 0) {
//             codesLength = codesLengthBuffer.readUInt32BE();
//             if (chunk.length >= codesLength) {
//                 codesString = chunk.slice(0, codesLength).toString('utf8');
//                 chunk = chunk.slice(codesLength);
//             }
//         }

//         // Continue with decompression logic once codes are read
//         if (codesString !== '') {
//             const codes = JSON.parse(codesString);

//             // Traverse the Huffman tree based on the bits in the compressed data
//             let currentCode = '';
//             for (let i = 0; i < chunk.length; i++) {
//                 const byte = chunk[i];
//                 const binaryString = byte.toString(2).padStart(8, '0'); // Convert byte to binary string

//                 // Add the bits of the current byte to the current code
//                 currentCode += binaryString;

//                 // Check if the current code matches any Huffman code
//                 for (const [char, code] of Object.entries(codes)) {
//                     if (currentCode.startsWith(code)) {
//                         decodedString += char;
//                         currentCode = currentCode.slice(code.length);
//                     }
//                 }
//             }
//         }
//     });

//     inputStream.on('end', () => {
//         // Write the decoded string to the output stream
//         outputStream.write(decodedString);
//         outputStream.end();
//     });
// }
export function decompress(inputFile, outputFile) {
  // const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });

  const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  let compressedObjectString = '';
  compressedObjectString=fs.readFileSync(`public/uploads/${inputFile}`)
 
  // inputStream.on(', (chunk) => {
  //   console.log(chunk)
  //     compressedObjectString += chunk;
  //     console.log("hello")
  // });
  
  // inputStream.on('end', () => {
      // Parse the compressed object
      const compressedObject = JSON.parse(compressedObjectString);
  console.log(compressedObject)
      // Extract compressed data from the object
      const compressedData = compressedObject.data;

      // Extract Huffman codes
      const codes = {};
      Object.assign(codes, compressedObject);
      delete codes.data;

      // Traverse the Huffman tree based on the bits in the compressed data
      let currentCode = '';
      let decodedString = '';
      for (let i = 0; i < compressedData.length; i++) {
          currentCode += compressedData[i];
          for (const [char, code] of Object.entries(codes)) {
              if (currentCode === code) {
                  decodedString += char;
                  currentCode = '';
                  break;
              }
          }
      }

      // Write the decoded string to the output stream
      outputStream.write(decodedString);
      outputStream.end();
  // });
}



  export function huffcompress(inputfile) {
    const inputFile = `public/uploads/${inputfile}`;
    const data = fs.readFileSync(inputFile, 'utf-8');
    
    // Count the frequency of each character
    const freq = {};
    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        if (freq[char]) {
            freq[char]++;
        } else {
            freq[char] = 1;
        }
    }
    
    // Build the Huffman tree
    const unique_size = Object.keys(freq).length;
    const Min_Heap_ = createAndBuildMin_Heap(Object.keys(freq), Object.values(freq), unique_size);
    const root = buildHuffmanTree(Object.keys(freq), Object.values(freq), Min_Heap_);
    
    // Generate the Huffman codes
    const codes = {};
    generateCodes(root, '', codes);
    
    console.log("Huffman Codes:", codes);
    
    // Compress the input text file
    const outputFile = path.resolve('output.txt');
    // compress( inputFile,outputFile,codes,codes);
 compress(inputFile,outputFile,codes,codes)
//  const decompressedFile = path.resolve('d.txt');
//  decompress(outputFile, decompressedFile);
return outputFile
}



