import React,{useState} from 'react'
import Logo from '../images/Logo.png'


import { useNavigate,Link } from 'react-router-dom'
import { BASE_URL } from '../helper'
import axios from 'axios'


function SignUp() {

  const [username, setUsername] = useState('');
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error,setError]= useState('');


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${BASE_URL}/api/users/signup`, {
        username,
        Name,
        email,
        password
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      });
  
      console.log(response.data);

      console.log(`${BASE_URL}`);
      if (response.data.success) { 
        setSuccess(response.data.message);
        alert('Signup successful!');
         // 'success' should match the backend response

         
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || "Signup failed");  // Show error message
    }
  };
  
  return (

<div className='flex justify-center items-center h-screen '>

<div className='flex flex-col justify-center items-center w-[400px] min-h-auto p-4 m-6  bg-[#030303] rounded-2xl'>
  <img className='w-25 h-25'src={Logo} alt="Logo" />
  <div className='flex flex-col w-[90%] px-4'>

    <form  action  ='' onSubmit= {handleSubmit} className=' flex flex-col    gap-2'>
      <p  className='text-gray-400'>Username:</p>
 <div className=' inputbox'>
    <input onChange={(e) => setUsername(e.target.value)} value={username} className='w-[90%]' type="text" placeholder="Enter your username" />
      </div>
      <p className='text-gray-400'>name:</p>
      <div className=' inputbox'>
      <input onChange={(e) => setName(e.target.value)} value={Name} className=' w-[90%]' type="text" placeholder="Enter your name" />
      </div>
      <p className='text-gray-400'>Email:</p>
      <div className=''>
      <input onChange={(e)=> setEmail(e.target.value)} value={email} className='inputbox w-[90%] ' type="email" placeholder="Enter your email" />
      </div>

      <p className='text-gray-400 '>Password:</p>
      <div className=' mb-2 justify-center'>
      <input onChange={(e) => setPassword(e.target.value)} value={password} className='inputbox w-[90%]' type="password" placeholder="Enter your password" />
      </div>
      <div className='text-red-400'>{error}</div>
    
<p  className='text-gray-400 flex justify-center'>Already have an account?<Link className='text-blue-400' to="/login">Login</Link></p>
      
<div className=' signup  justify-center mb-4'>
      <button type="submit" className='btnNormal w-[90%]' >Sign Up</button>
      </div>
     

    
      

     
      </form>
    </div>

</div>
</div>
  )
}

export default SignUp