const express=require('express');
const router= express.Router();

const studentsController = require('../controllers/studentsController');
const validator = require('../middlewars/studentMWValidator');
const auth = require('../middlewars/authMWPermission');

router.param('id',(req,res,next,val)=>{
    if(/^([a-f\d]{2}){12}$/.test(val)){
        next();
    }else{
        res.status(400).send('invalid id');
    }
});

router.get('/',studentsController.getAllStudents);

router.get('/:id',studentsController.getStudentById);

router.post('/',validator,auth,studentsController.addStudent);

router.delete('/:id',auth,studentsController.deleteStudent);

router.put('/:id',auth,studentsController.updateStudent);

module.exports = router;