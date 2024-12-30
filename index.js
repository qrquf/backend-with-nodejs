const express=require('express');
const app=express();
const port=8000;
const item=require('./models/schema.js');
const fs=require('fs');
const Users=require('./data.json');
const jwt=require('jsonwebtoken');
const { time } = require('console');
app.listen(port,()=>{
    console.log("the server has started listening");
});
var token;
const key='sidd@123';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/jwtauth',async (req,res)=>{
const data=req.body;
const items=await item.find({email:data.email,name:data.name});
if(items==null)
{
    return res.send("invalid email or name");
}
else{
    token=await jwt.sign({
        id:items.id,
        email:items.email,
        name:items.name
    },
    key
);
return res.json(items);
}
});
app.post('/insertdata',async (req,res)=> {
    const data=new item(req.body);
    console.log(req.body);
    const saveditem=await data.save();
    return res.json();
    });
    const data2=async (req,res,next)=>
    {
        await  jwt.verify(token,key,(err)=>{
          
        });
        next();
    };
    
app.get('/verifyuser',data2,async (req,res)=>{
 return res.send("login successful");
});

app.get('/finddata/:email/:name',async (req,res)=>{    
const name=req.params.name;
    console.log(email);
    const d=await item.find({email:email,name:name});
    return res.json(d);
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

