const multer=require('multer');
const mongoose=require('../connections/dbconnection.js');
const item=require('../models/sellerschema.js');
const subscription=require('../models/subscription.js');
const transaction=require('../models/transactionschema.js');
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
    const d=subscription.findOne({Seller_id:req.body.Seller_id});
    if(d && req.query.s_id!=null)
    {
    const updatedata=await subscription.findOneAndUpdate({Seller_id:req.query.s_id},
    {$set:req.body},
    {$new:true}
 );
 return res.send(updatedata);
}
    else
    {
    const startdate=new Date(req.body.Start_date);
    const expiry=new Date(req.body.Expiry_date);
    const data=new subscription(req.body);
    const savedata=await data.save();
    return res.json(savedata);
}}
const viewsubscription=async(req,res)=>{
    const sellerid=req.query.s_id;
    const data=await subscription.find({Seller_id:sellerid});
    return res.json(data);
}
const buysubscription=async(req,res)=>{
    const data=new transaction(req.body);
    const savedata=await data.save();
    return res.json(savedata);
}
module.exports={
    buysubscription,
    viewsubscription,
    addsubscription,
    addseller,
    sellerlogin,
    upload,
    updateseller,
    findseller
};