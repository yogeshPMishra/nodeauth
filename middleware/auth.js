const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token =  req.header('Authorization').replace('Bearer','') ;
    if(!token){
        res.status(400).send("Missing token");
    }
    try {
        const  decode = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decode);
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }

    return next();
}
module.exports = auth;
