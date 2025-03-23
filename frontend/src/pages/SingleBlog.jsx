import {react,useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Website from '../images/Website.jpeg'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../helper'
import axios from 'axios'
import { set } from 'mongoose'
import parse from 'html-react-parser';







const SingleBlog = () => {
  const {blogId} =useParams();
  const [blog,setBlog]=useState({});
  const [error,setError]=useState('');
  console.log(blogId);
  const fetchablog=async()=>{
    try{
      const token=localStorage.getItem('token');
      if(!token){
        setError("Unauthorized");
        return;
      }
      const response= await axios.get(`${BASE_URL}/api/users/getablog/${blogId}`,
        {headers:{
          Authorization:`Bearer ${token}`
        }
     
      });
      console.log('Blog ID from URL:', blogId);
      if(response.data.success){
        setBlog(response.data.blog);
      }
    }catch(error){
      setError(error.response?.data?.message || "Error fetching blog");
    }
  }
  useEffect(() => {
    fetchablog();
  }, [blogId]);
  
  return (
   
    <>
    <Navbar/>
   
    <div className="single-blog px-[100px] mt-4 h-calc(100vh-100px) gap-4">
      <div className='flex  justify-center gap-4 w-full min-h-[400px]'>
  <div className="left w-[40%] h-full">
    <img className="w-full rounded-lg h-[500px]" src={blog.image} alt="Blog" />
  </div>
  <div className='ml-4 gap-3'>
    <h2 className="text-3x font-[500]  text-bold">{blog.title}</h2>
    <p className="text-[15px] text-gray-500 mt-3 mb-3">Created At:{new Date(blog.createdAt).toDateString()}</p>
    <h3>Description</h3>
    <p className="text-sm text-gray-600 mb-5">{blog.description}</p>
    <h3 className="text-lg">Content</h3>
    {
  
    blog.content? parse(blog.content) :""
    }
  </div>
 
  </div>
  <div className='mt-4 flex justify-center mx-auto '>
 
  </div>
</div>
<Footer/>




    
    </>
  )
}

export default SingleBlog