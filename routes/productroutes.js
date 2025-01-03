const express=require('express');
const router=express.router();
const proudctcontroller=require('../controllers/productcontroller.js');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('addproduct',proudctcontroller.addproduct);
