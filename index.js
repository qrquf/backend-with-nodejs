const express=require('express');
const app=express();
const port=8000;
const fs=require('fs');
const Users=require('./data.json');
const { time } = require('console');
app.listen(port,()=>{
    console.log("the server has started listening");
});
const mongoose=require('mongoose');
const mongouri='mongodb://127.0.0.1:27017/handicraft?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.6';
mongoose.connect(mongouri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("connected successfully")).catch((error)=>console.log(error));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const schema=mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
   
});
const item=mongoose.model("users",schema);

app.post('/insertdata',async (req,res)=> {
const data=new item(req.body);
console.log(req.body);
const saveditem=await data.save();
return res.json(saveditem);
});

app.get('/users',(req,res)=>{
return res.json(Users);
});
app.get('/adduser',(req,res)=>{
    Users.push({
        'name':'siddharth srivastava',
        'email':'dd@gmail.com'
    });
    fs.appendFile('log.txt',(Date.now()).toString()+(Date),
    (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
   return res.json(Users);
});
app.post('/finduser',(req,res)=>{
    console.log(res);
});

