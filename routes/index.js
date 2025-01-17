const express=require('express');
const router=express.Router();
const userroute=require('./userroutes.js');
const productroute=require('./productroutes.js');
const sellerroute=require('./sellerroutes.js');
router.use('/user',userroute);
router.use('/product',productroute);
router.use('/seller',sellerroute);
module.exports=router;