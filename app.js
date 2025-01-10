require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
const path=require('path');

app.listen(process.env.PORT,()=>{
    console.log("the server has started listening");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const routes=require('./routes/index.js');
app.use('/',routes);