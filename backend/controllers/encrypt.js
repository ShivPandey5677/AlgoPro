import R1 from "../models/encrypt.js"
import jwt from "jsonwebtoken"
import { AESEncrypt } from "../EncrDecr/AES.js";
export async function encryptFile(req,res){
    const fileadd=req.body.fileURL
    try{
   const encryptFile=AESEncrypt(fileadd);
   await R1.create({
    technique:"AES",
    encryptedfileadd:encryptFile
   })
    return res.status(200).json(encryptFile)
    }catch(error){
      console.log("Error Encrypting file",error)
      return res.status(500).json("Internal Server Error");
    }

}
export async function decryptFile(req,res){

}
export async function compressFile(req,res){

}
export async function decompressFile(req,res){
  
}