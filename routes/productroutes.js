const express=require('express');
const router=express.Router();
const proudctcontroller=require('../controllers/productcontroller.js');
const uploads=require('../middlewware/cloudinarystorage.js');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('/addproduct',uploads.fields([
    { name: 'product1', maxCount: 1 },
    { name: 'product2', maxCount: 1 },
    { name: 'product3', maxCount: 1 },
  ]),proudctcontroller.addproduct);
  router.get('/viewproduct',proudctcontroller.viewproduct);
  router.get('/getfeedback',proudctcontroller.givefeedback);
  router.post('/insertfeedback',proudctcontroller.insertfeedback);
  router.post('/updatefeedback',proudctcontroller.upload.fields([]),proudctcontroller.updatefeedback);
  router.get('/getcart',proudctcontroller.viewcart);
  router.post('/addcart',proudctcontroller.upload.fields([]),proudctcontroller.addcart);
  router.post('/deletecart',proudctcontroller.upload.fields([]),proudctcontroller.deletecart);
  router.post('/checkcart',proudctcontroller.upload.fields([]),proudctcontroller.checkcart);
  router.get('/sellerproduct',proudctcontroller.viewbyseller);
  router.post('/updateproduct',uploads.fields([
    { name: 'product1', maxCount: 1 },
    { name: 'product2', maxCount: 1 },
    { name: 'product3', maxCount: 1 },
  ]),proudctcontroller.updateproduct);
  router.post('/deleteproduct',proudctcontroller.upload.fields([]),proudctcontroller.deleteproduct);
  router.get('/findseller',proudctcontroller.findseller); 
  module.exports=router;
