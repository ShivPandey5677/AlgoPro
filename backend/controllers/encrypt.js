import R1 from "../models/encrypt.js"
import jwt from "jsonwebtoken"
export async function encryptFile(req,res){
  const token =req.cookies.accessToken;
  if(!token) return res.status(401).json("Not Logged In");
  jwt.verify(token,"secretkey" , async(err,userInfo)=>{
    if(err) return res.status(403).json("Token is invalid");
    const fileadd=req.body.fileadd;

  })

}