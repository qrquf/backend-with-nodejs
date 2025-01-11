const item=require('../models/schema.js');
const fs=require('fs');
const Users=require('../data.json');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const key='sidd@123';
const mongoose=require('../connections/dbconnection.js');
const insertdata=async (req,res)=>{
const data=new item(req.body);
const saveditem=await data.save();
return res.json(saveditem);
     }; 
const adduser=(req,res)=>{
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
};

const addfile=(req,res)=>{
    const data=req.file.destination+'/'+req.file.filename;
    return res.send({data});
    };

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

const findfile=(req,res)=>
    {
    const data="./uploads/"+req.params.filename;
    console.log(data);
    res.download(data,(err)=>{
    if(err) console.log("error in downloading the file");
    else return res.send("file successfully downloaded");
    });
    };
    var token1;
    const jwtauth=async (req,res)=>{
        const data=req.body;
        const items=await item.findOne({email:data.email,password:data.password});
        if(items==null)
        {
            return res.json({message:"failure"
            });
        }
        else{
            var token=await jwt.sign({
                email:items.email,
                name:items.name
            },
            key
        );

        return res.json(
            {
         message:"success",
         token:token       
            }
        );
        }
        };
        const finddata=async (req,res)=>{    
            const d=await item.find({});
            return res.json(d);
            };
            const restrictedlogin=async (req,res)=>{
            const r=req.header('Authorization');
                const token1=r && r.split(' ')[1];
            //    console.log(token1);
                await  jwt.verify(token1,key,(err,user)=>{
                if (err) return res.status(403).send({ error: 'Invalid token' });
                else  return  res.status(400).send('login successful');
                });
               
            };
            const userlogin=async (req,res)=>
            {
                const data=await item.findOne({email:req.body.email,
                    password:req.body.password
                });
                    if(data)
                {
                return res.send("success");
                }
                else return res.send("failure");   
            }
            const usersignup=async (req,res)=>
            {
                const data=new item(req.body);
                const value= await data.save();
                return res.json(value);
            }
            const validateemail=async (req,res)=>
            {
                const data=await item.findOne({email:req.body.email});
                if(data)
                {
                    return res.send("success");
                }
                else return res.send("failure");
            }
            const finduser=async(req,res)=>{
        const data=req.query.email;
        const  finder=await item.findOne({email:data});
        return res.json([finder]);
            }
const updateuser=async(req,res)=>
{
    const data=req.body;
    
    const update=await item.findOneAndUpdate(
        {email:data.email},
        {$set:data},
        {
            new:true
        }
    );
    return res.json(update);
}
module.exports={
    finduser,
usersignup,
userlogin,
insertdata,
finddata,
adduser,
jwtauth,
addfile,
restrictedlogin,
findfile,
upload,
validateemail,
updateuser
};