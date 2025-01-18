const item=require('../models/productschema.js');
const multer=require('multer');
const item2=require('../models/feedbackschema.js');
const useritem=require('../models/schema.js');
const cart=require('../models/cartschema.js');
const mongoose=require('../connections/dbconnection.js');
const seller=require('../models/sellerschema.js');
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
const addproduct=async(req,res)=>
    {   const name1='uploads/'+await req.files['product1'][0].filename;
        const name2='uploads/'+await req.files['product2'][0].filename;
        const name3='uploads/'+await  req.files['product3'][0].filename;
        req.body.product1=name1;
        req.body.product2=name2;
        req.body.product3=name3;   
        const data=new item(req.body);
        const f=await data.save();
        return res.json(f);
    }
    const viewproduct=async (req,res)=>{
        const data=await item.find({});
        return res.json(data);
    }
    const givefeedback=async(req,res)=>{
        const data=await item2.find({p_id:req.query.p_id});
        return res.json(data);
    } 
    const insertfeedback=async(req,res)=>
    {
       const data=new item2(req.body);
       const r= await data.save();
       return res.json(r);
    }
    const addcart=async(req,res)=>{
        const p_id=new mongoose.Types.ObjectId(req.body.p_id);
        const d=new cart({"p_id":p_id,
            "u_id":req.body.u_id
        });
        const save=await d.save();
        return res.json(save);
    }
    const deletecart=async(req,res)=>
    {
        const del=await cart.deleteOne({p_id:req.body.p_id,u_id:req.body.u_id});
        return res.json(del);
    }
    const checkcart=async(req,res)=>
    {
        const data=await cart.findOne({"p_id":req.body.p_id,"u_id":req.body.u_id});
        if(data)
        {
        return res.send("success");
        }
        else
        {
        return res.send("fail");
        }
    }
    const viewcart=async(req,res)=>{
        const d=await useritem.findOne({email:req.query.email});
        const pipeline = [
        {$match:{
            "u_id":d._id 
               }},
            {
              $lookup: {
                from: 'products', // Foreign collection name
                localField: 'p_id', // Field in the current collection
                foreignField: '_id', // Field in the foreign collection
                as: 'details', // Output array field
              },
            },
            {
              $unwind: {
                path: '$details', // Unwind the details array
              },
            },
            {
                $addFields: {
                  "details.u_id": "$u_id",
                  
                }
              },
            {
              $replaceRoot: {
                newRoot: '$details', // Replace the root document with the details object
              },
            },
            {
                $addFields: {
                  p_id: "$_id"
                }
              },
              {
                $unset: "_id"
              }
          ];
          const results = await cart.aggregate(pipeline);
    return res.json(results);
}
const viewbyseller=async(req,res)=>{
  const pipeline=[
    {
      $match: {
        "_id":new mongoose.Types.ObjectId(req.query.s_id)
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "email",
        foreignField: "email",
        as: "details"
      }
    },
    {
      $unwind: {
        path: '$details',
      }
    },
    {
      $replaceRoot: {
        newRoot: '$details'
      }
    }
  ];
  const data=await seller.aggregate(pipeline);
  return res.json(data);
};
const updateproduct=async(req,res)=>{
  if(req.files.length>0)
  {
    
  const name1='uploads/'+await req.files['product1'][0].filename;
  const name2='uploads/'+await req.files['product2'][0].filename;
  const name3='uploads/'+await  req.files['product3'][0].filename;
  req.body.product1=name1;
  req.body.product2=name2;
  req.body.product3=name3;   
  }
 
  const data=await item.findOneAndUpdate({_id:new mongoose.Types.ObjectId(req.body._id)},
    {$set:req.body},
    {new:true}
  );
  return res.json(data);
}
const deleteproduct=async(req,res)=>
{
  const data=await item.deleteOne({_id:new mongoose.Types.ObjectId(req.body._id)});
  return res.json(data);
}
    module.exports={
    upload,
    addproduct,
    viewproduct,
    givefeedback,
    insertfeedback,
    viewcart,
    addcart,
    deletecart,
    checkcart,
    viewbyseller,
    updateproduct,
    deleteproduct
    }
