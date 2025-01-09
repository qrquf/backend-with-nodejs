require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');

app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("the server has started listening");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes=require('./routes/index.js');
app.use('/',routes);