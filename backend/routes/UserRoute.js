const express=require('express');
const router=express.Router();

const userController=require('../controllers/UserController');
const uploads=require('../helper/multer');
const { verify } = require('jsonwebtoken');
const multer = require('multer');



router.post('/signup',userController.signup);
router.post('/login',userController.login);

router.post('/uploadblog',
  
    uploads, userController.uploadBlog);
router.get('/getblog',userController.getBlogs);
router.get('/getablog/:blogId',userController.getBlog);
router.delete('/deleteblog/:blogId',
    userController.verifyuser,
    userController.deleteBlog);
router.put('/updateblog/:blogId',
  uploads,
   
    userController.updateBlog);



module.exports=router;