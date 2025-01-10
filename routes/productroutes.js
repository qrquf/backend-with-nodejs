const express=require('express');
const router=express.Router();
const proudctcontroller=require('../controllers/productcontroller.js');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('/addproduct',proudctcontroller.upload.fields([
    { name: 'product1', maxCount: 1 },
    { name: 'product2', maxCount: 1 },
    { name: 'product3', maxCount: 1 },
  ]),proudctcontroller.addproduct);
  router.post('/viewproduct',proudctcontroller.viewproduct);
module.exports=router;
