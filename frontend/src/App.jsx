
import './App.css'
import Home from './pages/Home'
import {Notfound} from './pages/Notfound'
import SingleBlog from './pages/SingleBlog'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import UploadBlog from './pages/UploadBlog'
import { Route, Routes } from 'react-router-dom'
import Blogspage from './pages/Blogspage'
import UpdateBlog from './pages/UpdateBlog'
import About from './pages/About'
import ContactPage from './pages/ContactPage'

function App() {

  return (
   <>
   <Routes>
<Route path="/home" element={<Home />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/blog/:blogId" element={<SingleBlog />} />
<Route path="/uploadblog" element={<UploadBlog />} />
<Route path="/*" element={<Notfound />} />
<Route path='/' element={<Login/>} />
<Route path='/logout'element={<Login/>} />
<Route path='/blog'element={<Blogspage/>} />
      <Route path='/updateblog/:blogId'element={<UpdateBlog/>} />
      <Route path='/about'element={<About/>} />
      <Route path='/contact'element={<ContactPage/>} />




   </Routes>
   
   </>
  )
}

export default App
