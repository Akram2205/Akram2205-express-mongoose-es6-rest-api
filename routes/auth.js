const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const config= require('config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('../middlewars/authMWValidator')
//endpoint for login
router.post('/',validator,async(req,res,nxt)=>{
    try{
        //check email
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('email or password invalid');
        
        //check password
        let valid =await bcrypt.compare(req.body.password,user.password);
        if(!valid) return res.status(400).send('password invalid');

        //set jwt
        if(!config.get('jwtsec')) return res.status(500).send('token is not defined');
        let token = user.genAuthToken()
        res.header('x-auth-custom',token);
        res.status(200).send('login succesfull')
    }catch(err){
        nxt(err)
    }
});

module.exports= router;