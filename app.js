const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const {usermodel}=require("./models/users")

const jwt=require("jsonwebtoken")
const { postmodel } = require("./models/posts")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://nithya:nithya913@cluster0.r7eo1il.mongodb.net/newblogDb?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async(password)=>{
 
    const salt=await bcrypt.genSalt(10) 

    return bcrypt.hash(password,salt)

}

app.post("/signin",(req,res)=>{
   
    let input = req.body
    usermodel.find({"email":req.body.email}).then( 
        (response)=>{
            if (response.length>0) {
                let dbpassword=response[0].password
                console.log(dbpassword)
                bcrypt.compare(input.password,dbpassword,(error,isMatch)=>{
                    if (isMatch) {
                       
jwt.sign({email:input.email},"blog-app",{expiresIn:"1d"},
    (error,token)=>{
        if (error) {
            res.json({status:"unable to create tocken"})
        } else {
            res.json({status:"Success","userid":response[0]._id,"token":token})
        }

})

                    } else {
                        res.json({status:"incorect"})
                    }
                })
            } else {
                res.json({status:"not exist"})
            }
        }
    ).catch()
})

app.listen(8080,()=>{
    console.log("server started")
})