const express = require('express')
const multer  = require('multer')
const path = require('path')
const fs = require('fs')

const images = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname);
    }
});
const uploads= multer({ storage: images}).single('image')

module.exports=uploads