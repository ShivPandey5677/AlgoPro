import express from "express"
import { compressFile, decompressFile, decryptFile, encryptFile } from "../controllers/encrypt.js";
const router=express.Router();
router.post("/encrypt",encryptFile)
router.post("/decrypt",decryptFile)
router.post("/compress",compressFile)
router.post("/decompress",decompressFile)
export default router;