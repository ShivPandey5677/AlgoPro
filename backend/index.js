import express from "express"
import dotenv from 'dotenv';
dotenv.config();
// import csv from "csv-parser"
import fs from "fs"
import {AESEncrypt} from "./EncrDecr/AES.js"
import huff from "./EncrDecr/huffman.js";
import cors from "cors"
import cookiep from "cookie-parser"
import mongo from "mongoose"
import multer from "multer"
const app=express();
app.use(cookiep())
app.use(express.json())
const PORT=process.env.PORT || 5001;
mongo.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("connected to mongo");
})
const filePath = 'a.txt';
// AESEncrypt()
huff(filePath)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
      const a = Date.now()+file.originalname
      fileuploadpath += a;
}
});
// export const data = fs.readFileSync(filePath);
const upload=multer({storage:storage})
app.use("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).send(file.filename)
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})