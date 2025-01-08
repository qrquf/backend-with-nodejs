const express=require('express');
const router=express.Router();
const controller=require('../controllers/usercontroller.js');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.get('/adduser',controller.adduser);
router.post('/addfile',controller.upload.single('file'),controller.addfile);
router.get('/findfile/:filename',controller.findfile);
router.post('/jwtauth',controller.jwtauth);
router.post('/insertdata',controller.insertdata);
router.get('/finddata',controller.finddata);
router.get('/restrictedlogin',controller.restrictedlogin);
router.post('/login',controller.userlogin);
router.post('/signup',controller.usersignup);

module.exports=router;
