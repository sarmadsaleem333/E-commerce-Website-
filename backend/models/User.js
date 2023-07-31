const mongoose=require("mongoose");
const {Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
       type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    },
    balance:{
        type:Number,
        default:0
    }
});

const User=mongoose.model("user_mssstore",UserSchema);
module.exports=User;