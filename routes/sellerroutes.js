const express=require('express');
const sellercontroller=require('../controllers/sellercontroller.js');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/addseller",sellercontroller.upload.fields([]),sellercontroller.addseller);
router.post("/sellerlogin",sellercontroller.upload.fields([]),sellercontroller.sellerlogin);
router.post("/sellerupdate",sellercontroller.upload.fields([]),sellercontroller.updateseller);
router.get('/findseller',sellercontroller.findseller);
router.post('/addsubscription',sellercontroller.upload.fields([]),sellercontroller.addsubscription);
router.post('/viewsubscription',sellercontroller.viewsubscription);
router.post('/findproduct',sellercontroller.findproduct);

router.post('/buysubscription',sellercontroller.upload.fields([]),sellercontroller.buysubscription);
module.exports=router;