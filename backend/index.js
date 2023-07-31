const connectToMongo=require("./db");
const express=require("express");
const app=express();
var cors=require("cors");
const port=5000;



connectToMongo();

app.use(express.json());
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/vendor_auth',require('./routes/vendor_auth'));
app.use('/api/item',require('./routes/item'));
app.use('/api/accounts',require('./routes/accounts'));
app.listen(port,()=>{
    console.log(`MSS Store is listening on port http://localhost:${port}`);
});