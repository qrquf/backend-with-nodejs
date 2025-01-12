const item=require('../models/productschema.js');
const multer=require('multer');
const item2=require('../models/feedbackschema.js');
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
    module.exports={
    upload,
    addproduct,
    viewproduct,
    givefeedback,
    insertfeedback
    }
