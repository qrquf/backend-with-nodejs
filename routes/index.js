const express=require('express');
const router=express.Router();
const userroute=require('./userroutes.js');
const productroute=require('./productroutes.js');
router.use('/user',userroute);
router.use('/product',productroute)
module.exports=router;