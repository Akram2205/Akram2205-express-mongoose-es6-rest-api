const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth= require('../middlewars/authMWPermission');

router.param('id',(req,res,next,val)=>{
    if(/^([a-f\d]{2}){12}$/.test(val)){
        next();
    }else{
        res.status(400).send('invalid id');
    }
});

router.put('/:id',(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{isAdmin:true}).
    then((stdUpdated)=>{
        res.status(200).send(`updated ${stdUpdated}`);
    }).catch((err)=>{
        res.status(501).send('server error...')
    })
})
module.exports = router