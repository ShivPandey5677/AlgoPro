import R1 from "../models/encrypt.js"
import R2 from "../models/decrypt.js"
import fs from "fs"
import jwt from "jsonwebtoken"
import { AESDecrypt, AESEncrypt } from "../EncrDecr/AES.js";
import { EECDecrypt } from "../EncrDecr/EEC.js";
import { RSADecrypt } from "../EncrDecr/RSA.js";
import { decompress, huffcompress } from "../EncrDecr/huffman.js";
import path from "path";
export async function encryptFile(req,res){
    const fileadd=req.body.fileURL
    try{
   const encryptFile=AESEncrypt(fileadd);
   await R1.create({
    technique:"AES",
    encryptedfileadd:encryptFile
   });
   console.log(encryptFile);
  //  res.json(encryptFile);
   const filename = 'public/downloads/';
   const file = path.resolve(filename, encryptFile);
   console.log(file)
    return res.download(file)

  

    }catch(error){
      console.log("Error Encrypting file",error)
      return res.status(500).json("Internal Server Error");
    }

}
export async function decryptFile(req,res){
  const fileadd=req.body.fileURL
  const encryptedObject = JSON.parse(fs.readFileSync(`public/uploads/${fileadd}`, 'utf8'));
  const type=encryptedObject.type;
 let decryptFile
  try{
    
    if(type=="AES")
    decryptFile=AESDecrypt(fileadd);
    else if(type=="EEC")
   decryptFile=EECDecrypt(fileadd)
    else
    decryptFile=RSADecrypt(fileadd);
 await R2.create({
  technique:type,
  decryptedfileadd:decryptFile
 })
 const decrypt=decryptFile;
 console.log()
  // return res.status(200).json(decrypt)
  const filename = 'public/downloads/';
  const file = path.resolve(filename, decryptFile);
  console.log(file)
   return res.download(file)
  }catch(error){
    console.log("Error Decrypting file",error)
    return res.status(500).json("Internal Server Error");
  }
}
export async function compressFile(req,res){
 const fileadd=req.body.fileURL;
 try{
    const outputFile= huffcompress(fileadd)

    // if (outputFile) {
    //  // console.log(outputFile);
    //     const filename = 'public/downloads/';
    //     const file = path.resolve(filename ,outputFile);
    //     console.log(file);
    //    // fs.writeFileSync(file, outputFile);
    //      return res.download(file)
    // }
    
   return res.status(200).json(outputFile)
 }catch(error){
  console.log("Error Compressing File",error)
  return res.status(500).json("Internal Server Error")
 }
}
export async function decompressFile(req,res){
  const fileadd=req.body.fileURL;
  try{
const decompressedFile = path.resolve(`public/downloads/de${fileadd}.txt`);
 decompress(fileadd, decompressedFile);
//  const filename = 'public/downloads/';
//     const file = path.resolve(filename, decompressFile);
//     console.log(file)
//      return res.download(file)
 return res.status(200).json(decompressedFile)
  }catch(error)
{
  console.log("Error DECompressing File",error)
  return res.status(500).json("Internal Server Error")
}
}