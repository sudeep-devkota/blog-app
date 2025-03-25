  import React from "react";
  import Logo from "../images/Logo.png";
  import { Link, Navigate, NavLink } from "react-router-dom";
  import { useNavigate } from "react-router-dom";


  function Navbar() {

    const navigate=useNavigate();
    const logout = () => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
      // This will replace the current route with the login route
    window.location.reload(); 

    

    }
    return (
      <div className="navbar flex items-center justify-center bg-[#000000] h-[100px] px-6 mx-auto">
        {/* Logo Section */}
        <div className="logo flex items-center justify-left w-full">
          <img className="w-[100px]" src={Logo} alt="Logo" />
        </div>

        {/* Links Section */}
        <div className="links flex items-center justify-center gap-6   w-full">
        <NavLink to="/" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>About</NavLink>
        <NavLink to="/service" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Service</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Blogs</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "navlink active" : "navlink"}>Contact</NavLink>  
        <button onClick={()=>navigate("/uploadblog")} className="btnWhite">Admin</button>
        
          <button className="btnNormal" onClick={logout}>Logout</button>
         
        
          
          
        </div>
      </div>
  );
}

export default Navbar;
