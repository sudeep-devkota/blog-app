import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../helper'  
import { Navigate, useParams } from 'react-router-dom'  
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

function UpdateBlog() {

   
    
  const[post,setPost]=useState({title:'',description:'', content:'', date:'', image:''});
  const[newimage,setNewimage]=useState(null);
  const [preview,setPreview]=useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const {blogId}=useParams();
   

    useEffect(() => {
        axios.get(`${BASE_URL}/api/users/getablog/${blogId}`,
        {
            headers:
            {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }

        )

        .then(res => {
            setPost(res.data.blog);
            setPreview(res.data.blog.image);
        })
        .catch(err => {
            console.log(err);
        })

    },[blogId]);

    const handlechange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value});
        
    };
    const handleFileChange=(e)=>{
        setNewimage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

   

    const okupdate=async(e)=>{


        e.preventDefault();

        const formData = new FormData();
       formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("content", post.content);
        formData.append("date", post.date);

        if (newimage){ formData.append("image", newimage);
        }
else{
    formData.append("image", post.image);
    
}


  

        try {
            let response=await axios.put(`${BASE_URL}/api/users/updateblog/${blogId}`,

            formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            });
           
            if(response.data.success){
                setSuccess(response.data.message);
                alert("Blog updated successfully");
             navigator('/home');

            }
            console.log(blogId);
        } catch (error) {
            setError(error.response?.data?.message || "Error updating blog");   
        }
    }
  return (
    <>
    
        

        <Navbar />
        <div className='flex justify-center items-center h-screen'>
       
        <div className='flex justify-center items-center flex-col gap-4'>
        <h1>Update Blog</h1>
        <form className='flex flex-col gap-4' action=''>
        <input onChange={handlechange} value={post.title}  type='text' name='title' placeholder='title' />
        <input onChange={handlechange} value={post.description} type='text' name='description' placeholder='description' />
        <input onChange={handlechange}  value={post.content} type='text' name='content' placeholder='content' />
        <input onChange={handlechange} value={post.date} type='date' name='date' placeholder='date' />
        <div>
                    <p>Current Image:</p>
                    {preview && <img src={preview} alt="Preview" width="200px" />}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
       
        <button  onClick={okupdate} className='btnNormal' type='submit'>Update</button>
        </form>
        
        </div>
        </div>
        <Footer />
    

       



    </>
  )
}


export default UpdateBlog
