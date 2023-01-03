const mongoose = require('mongoose');

const UserSchwma = new mongoose.Schema({
    firstname:{
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    password:{
        type:String,
        default:null,
    },
    token:{
        type:String,
    }
});

module.exports = mongoose.model('User',UserSchwma);