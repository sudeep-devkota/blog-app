import React from "react";
import Logo from "../images/Logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar flex items-center justify-center bg-[#000000] h-[100px] px-6 mx-auto">
      {/* Logo Section */}
      <div className="logo flex items-center justify-left w-full">
        <img className="w-[100px]" src={Logo} alt="Logo" />
      </div>

      {/* Links Section */}
      <div className="links flex items-center justify-center gap-6   w-full">
        <Link className="navlink active" >Home</Link>
        <Link className="navlink">About</Link>
        <Link className="navlink">Service</Link>
        <Link className="navlink">Blogs</Link>
        <Link className="navlink">Contact</Link>
      </div>
    </div>
  );
}

export default Navbar;
