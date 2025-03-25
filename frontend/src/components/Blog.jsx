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
    <button className='flex items-center text-center gap-2 bg-[#252424] px-4 py-2 text-white h-[35px] w-fit hover:bg-gray-600'>Read More.......</button>
    <div className='flex gap-2  justify-center'>
      

    </div>

  </div>

  
  
  
  </>
  )
}

export default Blog