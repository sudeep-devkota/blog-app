const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const connectDB=require('./configuration/connect');
const userRoute=require('./routes/UserRoute');
const path=require('path');


connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.use(express.json());
app.use(express.urlencoded({extended:true}));

    
app.use(cors({
    origin: [
      'http://localhost:5000',
      'https://blog-app-kl9i.vercel.app',
      'https://blog-app-kl9i-olqo24qqv-sudeep-devkotas-projects.vercel.app',
    ],
    credentials: true
  }));
    







app.use('/api/users',userRoute);








app.listen(5000,()=>{
    console.log("server is running on port 5000")
})



