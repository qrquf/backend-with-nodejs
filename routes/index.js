const express=require('express');
const router=express.Router();
const userroute=require('./userroutes.js');
router.use('/user',userroute);
module.exports=router;