const multer=require('multer');
const mongoose=require('../connections/dbconnection.js');
const item=require('../models/sellerschema.js');
const subscription=require('../models/subscription.js');
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
const findseller=async(req,res)=>{
    const data=await item.find({email:req.query.email});
    return res.json(data);
}
const addsubscription=async(req,res)=>{
   const startdate=new Date(req.body.Start_date);
    const expiry=new Date(req.body.Expiry_date);
    const data=new subscription({"subscritpion_id":req.body.subscritpion_id,"Start_date":startdate,"Expiry_date":expiry,
    "Plan_name":req.body.Plan_name,
    "Subs_value":req.body.Subs_value,
    "Seller_id":req.body.Seller_id,
    "Plan_name":req.body.Plan_name,
});
    const savedata=await data.save();
    return res.json(savedata);
}
module.exports={
    addsubscription,
    addseller,
    sellerlogin,
    upload,
    updateseller,
    findseller
};