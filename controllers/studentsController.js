
const Student = require('../models/StudentModel');
const asyncFunction = require('../middlewars/async');

const getAllStudents=asyncFunction(async (req,res)=>{
    let students = await Student.find().sort({id:1});
    res.status(200).send(students);
}
)

const getStudentById=asyncFunction(async(req,res)=>{
    let std= await Student.findById(req.params.id);
    if(!std) return res.status(404).send('student not found');
    res.status(200).send(std);
}
);

const addStudent=async(req,res,nxt)=>{
    let std = new Student({
        id: req.body.id,
        name: req.body.name,
        dept: req.body.dept
    })

    std.save().then(()=>{
        res.status(200).send(`added ${std}`)
    }).catch((err)=>{
        nxt(err)
    })
};

const deleteStudent=asyncFunction( async (req,res)=>{
    let std = await Student.findByIdAndDelete(req.params.id)
    if(!std) return res.status(404).send('student not found');
        
    res.status(200).send('deleted: '+std);
}
);

const updateStudent=asyncFunction( async(req,res)=>{    
    let std =await Student.findByIdAndUpdate(req.params.id, req.body,{
        returnOriginal: false
    });
    if(!std) return res.status(404).send('student not found');
    res.status(200).send(`updated ${std}`)
}
);

module.exports={updateStudent,deleteStudent,addStudent,getStudentById,getAllStudents}