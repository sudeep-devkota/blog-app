import React from 'react';
import Website from '../images/Website.jpeg';
import{useNavigate} from 'react-router-dom'



function Blog({blog}) {
  const navigate=useNavigate();

  return (
  <>
  <div onClick={()=>navigate(`/blog/${blog._id}`)} className= 'blogs flex flex-col gap-4'>
    

  <img className='blogimg' src={blog.image|| Website } alt="Blog" />
  <h2 className='text-lg text-gray-400'>{blog.title|| "No title"}</h2>
    <p className='text-sm text-gray-600'>{blog.description}</p>
    </div>
  
  
  
  </>
  )
}

export default Blog