const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
    //get x-auth-token
    const token = req.header('x-auth-token');
    if(!token) return res.status(501).send('access denied');
    try{
        const decodedPayload = jwt.verify(token,config.get('jwtsec'));
        if(!decodedPayload.adminRole) return res.status(501).send('access denied');
        next();
    }catch(err){
        res.status(400).send('invalid token');
    }
}