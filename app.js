require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors);
app.listen(process.env.PORT,()=>{
    console.log("the server has started listening");
});

const routes=require('./routes/index.js');
app.use('/',routes);