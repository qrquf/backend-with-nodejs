const express=require('express');
const sellercontroller=require('../controllers/sellercontroller.js');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/addseller",sellercontroller.upload.fields([]),sellercontroller.addseller);
router.post("/sellerlogin",sellercontroller.upload.fields([]),sellercontroller.sellerlogin);
router.post("/sellerupdate",sellercontroller.upload.fields([]),sellercontroller.updateseller);
module.exports=router;