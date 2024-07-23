const validator = require('../utils/studentValidator');

module.exports = (req,res,next)=>{
    let valid = validator(req.body);
    if(valid){
        next();
    }else{
        res.status(403).send('forbidden Command')
    }
}