import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/Logo.png";
import axios from "axios";
import { BASE_URL } from "../helper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
            email,
            password,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.success) {
              localStorage.setItem("token", response.data.token); // Store the token in local storage
              alert("Login successful!"); // Show success message
              window.location.href = "/"; // Redirect to home page
            } else {
              alert(response.data.message); // Show error message
            }
          })
          .catch((error) => {
            console.error(
              "Error:",
              error.response ? error.response.data : error
            );
            alert(error.response?.data?.message || "Login failed"); // Show error message
          });
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed"); // Show error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center w-[400px] min-h-[400px] p-4 m-6  bg-[#030303] rounded-2xl">
        <img className="w-25 h-25" src={Logo} alt="Logo" />
        <div className="flex flex-col w-[90%] px-4">
          <form
            action="post"
            onSubmit={handleSubmit}
            className=" flex flex-col  gap-2"
          >
            <p className="text-gray-400">Email:</p>
            <div className="">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="inputbox w-[90%] "
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <p className="text-gray-400 ">Password:</p>
            <div className=" mb-2 justify-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="inputbox w-[90%]"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-2">
              <p className="text-red-400">{error}</p>
            </div>
            <p className="text-gray-400 flex justify-center">
              Don't have an account?
              <Link className="text-blue-400" to="/signup">
                Signup
              </Link>
            </p>

            <div className=" signup  justify-center mb-4">
              <button type="submit" className="btnNormal w-[90%]">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
