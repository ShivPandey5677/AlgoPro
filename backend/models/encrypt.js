import mongo from "mongoose"
const encrypts=new mongo.Schema({
    userid:{type:String,
    required:true},
    technique:{type:String},
    encryptedfileadd:{
    type:String
    }
})