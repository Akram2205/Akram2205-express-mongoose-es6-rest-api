const express= require('express');
const router= express.Router();
const validator= require('../middlewars/usersMWValidator');
const User = require('../models/User');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const config= require('config')

//endpoint for registration
router.post('/',validator,async (req,res,nxt)=>{
    try{
        //check already exist
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).send('user already registred');

        //hash password
        let salt =await bcrypt.genSalt(10);
        let hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        //set token
        if(!config.get('jwtsec')) return res.status(500).send('token is not defined')
        let token = user.genAuthToken()
        res.header('x-auth-token',token);
        await user.save();
        res.status(200).send('registred succesfull');
    }catch(err){
        nxt(err)
    }
});

module.exports= router;