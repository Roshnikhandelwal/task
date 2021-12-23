const mongoose=require('mongoose');

const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(()=>console.log("connection sucessfull...."))
.catch((err)=>console.log(err));