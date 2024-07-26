const mongoose=require("mongoose")
const userschema=mongoose.Schema(

    {
        "sname":String,
        "email":{type:String,required:true},
        "phone":String,
        "gender":String,
        "password":{type:String,required:true}
        
        
    }
)
let usermodel=mongoose.model("users",userschema)
module.exports={usermodel}