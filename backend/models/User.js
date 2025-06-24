const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        default:""
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("User",userSchema)