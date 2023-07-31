const mongoose=require ("mongoose");
const mongoURI="mongodb://127.0.0.1";
const connectToMongo=()=>{
mongoose.connect(mongoURI)
   .then(()=>{
    console.log("Connected to mongodb successfully");
   })
   .catch((error)=>{
    console.log("Erorr connecting mongo db :",error);
   })
}

module.exports=connectToMongo;
