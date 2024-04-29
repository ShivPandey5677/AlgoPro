import mongo from "mongoose"
const decrypts=new mongo.Schema({
    technique:{type:String},
    decryptedfileadd:{
    type:String
    }
})
export default mongo.model("3)Decrypts",decrypts)