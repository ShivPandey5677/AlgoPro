import mongo from "mongoose"
const encrypts=new mongo.Schema({
    technique:{type:String},
    encryptedfileadd:{
    type:String
    }
})
export default mongo.model("2)Encrypt",encrypts)