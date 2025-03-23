const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const app=express();
const mongoose=require('mongoose');
const User=require('../models/UserModel');
const upload=require('../helper/multer');
const Blog=require('../models/BlogModel');
const fs=require('fs');





exports. signup=async(req,res)=>{

    const {username,email,password}=req.body;

    try{
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=new User({username,email,password:hashedPassword});

        await user.save();
       return res.status(201).json({success:true, message:"User created successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"}); 
        }
       const token=jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'1d'
    });

    return res.status(200).json({success:true, message:"User logged in successfully",token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.uploadBlog=async(req,res)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        let{ title, description ,content}=req.body;
        if( !title || !description || !content){
            return res.status(400).json({message:"All fields are required"});
        }
        if(!req.file){
            return res.status(400).json({message:"Image is required"});
        }

  
const imagename=req.file? req.file.filename:null;
const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${imagename}`;
    const blog=new Blog({title,description,content,
        image:imageUrl,
       user:User._id});

   const shavedBlog= await blog.save();
   console.log(shavedBlog);
    return res.status(200).json({success:true, message:"Blog uploaded successfully",blog:blog});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

exports.getBlogs=async(req,res)=>{
   
   const token=req.headers.authorization.split(" ")[1];
   if(!token){
    return res.status(401).json({
        success:false,
        message:"Unauthorized"});
   }
   let decoded=jwt.verify(token,process.env.JWT_SECRET);
   let user=await User.findById(decoded.id);
   if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"});
   }
   else{
    let blogs=await Blog.find({});
    return res.status(200).json({
        success:true,
        message:"Blogs fetched successfully",
        blogs:blogs
    });
   }
}
exports.getBlog=async(req,res)=>{
    const {blogId}=req.params;
    if(!blogId){
        return res.status(400).json({
            success:false,
            message:"Blog id is required"});
    }
    const token=req.headers.authorization.split(" ")[1];
       if(!token){
        console.log(token);
        return res.status(401).json({
            success:false,
            message:"Unauthorized"});
       }
       let decoded=jwt.verify(token,process.env.JWT_SECRET);
       let user=await User.findById(decoded.id);
       if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"});
       }
       else{
        let blog=await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({
                success:false,
                message:"Blog not found"});
        }
        return res.status(200).json({
            success:true,
            message:"Blog fetched successfully",
            blog:blog
        });
       }
}
   

