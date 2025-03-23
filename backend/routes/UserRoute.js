const express=require('express');
const router=express.Router();

const userController=require('../controllers/UserController');
const uploads=require('../helper/multer');



router.post('/signup',userController.signup);
router.post('/login',userController.login);

router.post('/uploadblog',uploads, userController.uploadBlog);
router.get('/getblog',userController.getBlogs);
router.get('/getablog/:blogId',userController.getBlog);



module.exports=router;