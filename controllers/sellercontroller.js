const multer=require('multer');
const mongoose=require('../connections/dbconnection.js');
const item=require('../models/sellerschema.js');
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
const addseller=async(req,res)=>
{
      const data=new item(req.body);
      const savedata=await data.save();
      return res.json(savedata);
}
const sellerlogin=async(req,res)=>
{
    const data=await item.find({"email":req.body.email,"password":req.body.password});
    if(data) return res.send("success");
    else return res.send("failure");
}
const updateseller=async(req,res)=>
{
    const data=await item.findOneAndUpdate({email:req.body.email},{
    $set:req.body
},
{
    new:true
});
return data; 
}
module.exports={
    addseller,
    sellerlogin,
    upload,
    updateseller
};