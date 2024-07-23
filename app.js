const express = require('express');
const app= express();
const mongoose= require('mongoose');
const path = require('path');
const errorMw= require('./middlewars/authMWPermission');

process.on('uncaughtException',(exception)=>{
    console.log("uncaught exception"); 
    
});

process.on('unhandledRejection',(exception)=>{
    console.log("promise rejected");
})

let port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listen to ${port}`);
});

//connect mongoose
mongoose.connect('mongodb://localhost:27017/univ',{
    family:4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("connected with DB")
}).catch((err)=>{
    console.log(err)
});

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//custom middleware
const login= require('./middlewars/login');
app.use(login);

//
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

//routes
const studentsRouter = require('./routes/students');
const usersRouter= require('./routes/users');
const authRouter= require('./routes/auth');
const adminRouter= require('./routes/admin');

app.use('/api/login/',authRouter);
app.use('/api/users/',usersRouter);
app.use('/api/students/',studentsRouter);
app.use('/api/admin',adminRouter);

app.use(errorMw);
