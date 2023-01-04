const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.home = (req,res)=>{
    res.status(200).json({
     "name":"sangram",
     "age": "20"
    });
}

 module.exports.register = async (req,res)=>{
    try {
        const {firstname,lastname,email,password} = req.body;
        if(!(firstname && lastname && email && password)){
            res.status(404).send('All fields are required');
        }
        const ExistingUser = await User.findOne({email});
        if(ExistingUser){
            res.status(400).send('User Already have Account.');
        }
        const EncriptPwd = await bcrypt.hash(password,10);
        const user = await User.create({
            firstname,
            lastname,
            email:email.toLowerCase(),
            password:EncriptPwd
        })
         
        const token =  jwt.sign({user_id:user._id,email},process.env.MONDODB_URL,{ expiresIn: '2h' })
        user.token = token;
        user.password = undefined;
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
    }
}

module.exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!(email && password)){
            res.status(400).send("Field is missing");
        }
        const user = await User.findOne({email});

        if(user && bcrypt.compare(password,user.password)){
            const token = jwt.sign(
               {user_id:user._id,email},
               process.env.SECRET_KEY,
               {
                expiresIn:'2h'
               }
            )

            user.token = token;
            user.password= undefined;
            res.status(200).json(user);
        }
        res.send(400).send("email or password is invalid");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.dashboard = (req,res)=>{
    res.status(200).send('welcome to dashboard page');
}

module.exports.userlist = async(req,res)=>{
    const dataUser = await User.find();
    res.status(200).json(dataUser);
}