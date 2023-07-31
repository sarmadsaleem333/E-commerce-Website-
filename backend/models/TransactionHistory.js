const mongoose=require("mongoose");
const {Schema}=mongoose;
const TransactionHistorySchema=new Schema({
    user:{
        required:false,
        type:String   
    },
    item:{
        required:false,
        type:String
    },
    vendor:{
        required:false,
        type:String
    },
    price:{
        required:false,
        type:Number
    },
    date:{
        type: Date,
        default:Date.now
    },
    credit:{
        type:Number,
        required:false,
    }
});

const TransactionHistory=mongoose.model("transaction_history_mssstore",TransactionHistorySchema);
module.exports=TransactionHistory;