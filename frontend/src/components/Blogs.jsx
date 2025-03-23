  import React, { useEffect, useState } from 'react'
  import Blog from './Blog'
  import axios from 'axios'
  import { BASE_URL } from '../helper'

  function Blogs() {
    const [blogs,setBlogs]=useState([]);
    const[error,setError]=useState('');
  const getBlogs=async()=>{
    try{
    let response=await axios.get(`${BASE_URL}/api/users/getblog`,
    {
      headers:
      {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      body:JSON.stringify({
        token:localStorage.getItem('token')
      })
    });

    
    if(response.data.success){
      setBlogs(response.data.blogs);
    }
    }catch(error){
      setError(error.response?.data?.message || "Error fetching blogs");
    }
    }
  useEffect(() => {
    getBlogs();
  }, []);
  
    return (
    <>
    <div className="blog-header px-6 mx-auto">
    <h1 className='text-2xl px-5 '>Latest Blogs</h1>
    <div className="blog-container">
    {
  blogs? blogs.map((blog,index)=><Blog key={index} blog={blog}/>):''
      
    }
    

      </div>

    </div>
  
  
  
  </>
  )
}

export default Blogs
