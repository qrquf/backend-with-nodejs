require("dotenv").config();
const express=require('express');
const app=express();
const port=process.env.PORT;

const item=require('./models/schema.js');
const fs=require('fs');
const Users=require('./data.json');
const jwt=require('jsonwebtoken');
const { time } = require('console');
const multer=require('multer');
const storage=multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './uploads'); // Save file in 'uploads' folder
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
        
        },
    }  
);
const upload=new multer({storage});
app.listen(port,()=>{
    console.log("the server has started listening");
});
app.post('/addfile',upload.single('file'),(req,res)=>{
const data=req.file.destination+'/'+req.file.filename;
return res.send({data});

});
app.get('/findfile/:filename',(req,res)=>
{
const data="./uploads/"+req.params.filename;

console.log(data);
res.download(data,(err)=>{
if(err) console.log("error in downloading the file");
else return res.send("file successfully downloaded");
});
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
 return res.send({token});
});
app.get('/finddata/:email/:name',async (req,res)=>{    
const name=req.params.name;
    console.log(email);
    const d=await item.find({email:email,name:name});
    return res.json(d);
});
app.get('/restrictedlogin',async (req,res)=>{
const r=req.header('Authorization');
    const token1=r && r.split(' ')[1];
    console.log(token1);
     console.log(token);
    await  jwt.verify(token1,key,(err,user)=>{
    if (err) return res.status(403).send({ error: 'Invalid token' });
    else  return  res.status(400).send('login successful');
    });
   
})
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

