import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";

import { BASE_URL } from "../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import parse from "html-react-parser";

import Blog from "../components/Blog";
import {faUserPen} from '@fortawesome/free-solid-svg-icons'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function UploadBlog() {
  const [isadmin, setIsadmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");

  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [blogs, setBlogs] = useState([]);


  const navigate = useNavigate();

  const checkadmin = async () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin") {
        setIsadmin(true);
      } else {
        setError("Invalid admin secret");
      }
    } else {
      setError("Please enter admin secret");
    }
  };
  const handleimage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const postBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/uploadblog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      console.log(token);

      if (response.data.success) {
        alert("Blog uploaded successfully");
        fetchblog();
      }

      setTitle("");
      setDescription("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      alert(error.response?.data?.message || "Blog upload failed");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const fetchblog=async()=>{
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
    console.log(response.data);


    
    if(response.data.success){
      setBlogs(response.data.blogs);
    }
    }catch(error){
      setError(error.response?.data?.message || "Error fetching blogs");
    }
    }
    useEffect(() => {
      fetchblog();
    }, []);
  

   const deleteblog=async(blogId)=>{
    try{
      let response=await axios.delete(`${BASE_URL}/api/users/deleteblog/${blogId}`,
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
      console.log(response.data);
      console.log(blogId);
      if(response.data.success){
        alert("Blog deleted successfully");
        fetchblog();
        navigate('/uploadblog');
      }
      }catch(error){
        setError(error.response?.data?.message || "Error deleting blog"); 
      }
      }
     
      
    
 


  return (
    <>
      {isadmin == false ? (
        <>
          <div className="cont flex justify-center items-center h-screen ">
            <div className="flex flex-col  justify-center items-center w-[25vw] h-fit bg-black gap-2 px-4 py-4 rounded-2xl">
              <h1 className="text-xl px-4">Login to upload blog</h1>
              <div className="inputbox flex flex-col gap-2 w-full">
                <input
                  className="input border border-gray-600"
                  onChange={(e) => setAdminSecret(e.target.value)}
                  value={adminSecret}
                  type="text"
                  placeholder="enter your secret key "
                ></input>
              </div>
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => {
                  checkadmin();
                }}
                className="btnNormal mt-3 w-full"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex justify-center  ">
            <div className="w-[96%] mx-auto px-6 m-5 gap-4 ">
              <p className="text-xl justify-center items-center align-center mb-2">
                Upload your blog
              </p>
              <div className=" inputbox flex flex-col gap-2 w-full">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="input m-auto ml-4"
                  type="text"
                  placeholder="Enter your blog title"
                  required
                />
              </div>
              <textarea
                className="input m-auto ml-4"
                type="text"
                placeholder="Enter your blog description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></textarea>
              <JoditEditor
                className="input m-auto ml-4 text-black bg-black"
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              />
              <input
                className="bg-black text-white border border-gray-600"
                type="file"
                onChange={handleimage}
                id="file"
                required
              ></input>
              <br />
              <div className="hehe gap-2  w-full ">
                <button
                  onClick={(e) => {
                    postBlog(e);
                  }}
                  className="btnNormal mt-3 "
                  type="submit"
                >
                  Create blog
                </button>
              </div>
            </div>
          </div>
          <div className=" blog-container flex flex-col gap-4 p-6">
           
          
            <div className=" blog-card-container grid  grid-cols-3 gap-6 max-h-[700px]">
             
           



            {blogs.map((blog) => (
              <div key={blog._id} className="blog-card flex flex-col gap-4 mb-5"
                // onClick={()=>navigate(`/blog/${blog._id}`)}
                 >
                <img className="blogimg max-h-[400px]" src={blog.image} alt="Blog" />
                <h2 className="text-lg text-gray-400">
                  {blog.title || "No title"}
                </h2>
                <p className="text-sm text-gray-600">{blog.description}</p>
              {
                blog.content?
                parse(blog.content):<p>no content</p>
              }
                

                <div className="flex  justify-around gap-2">

                <button onClick={
                 

                 

                  ()=>{
                    const token = localStorage.getItem("token");
                   console.log(token);
                    if (!token) {
                      alert("Please login to update your blog");
                      navigate("/login");
                      return;
                    }
                    navigate(`/updateblog/${blog._id}`)}
               

                } className=" text-blue-500 flex items-center" ><FontAwesomeIcon className="mr-2 text-2xl" icon={faUserPen} /> </button>
               
                <button onClick={()=>deleteblog(blog._id)} className=" text-red-500 flex items-center" ><FontAwesomeIcon className="mr-2 text-2xl" icon={faTrash} /></button>
                 
                   
                 
                </div>
               
              </div>
            ))}
           
          </div>
          </div>
          
          
          
       

        </>
      )}
    </>
  );
}

export default UploadBlog;
