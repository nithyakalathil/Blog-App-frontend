const mongoose=require("mongoose")
const userschema=mongoose.Schema(

    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        Message:String,
        postedDate:{
            type: Date,
            default: Date.now
        }        
        
        
    }
)
let postmodel=mongoose.model("posts",userschema)
module.exports={postmodel}