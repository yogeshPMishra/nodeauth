const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const{MONDODB_URL}= process.env;
module.exports.connect=()=>{
    mongoose.connect(MONDODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    }).then(()=> console.log('DB CONNECTED SUCCESSFULLY')
     ).catch(()=>console.log("FAILED TO CONNECT DB"))
}
