import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/AuthSlice";
import { NavLink,useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();

  const handlesignup = async(e) => {
    e.preventDefault();
    try {
        // Create user object to send to the backend
        const user = { email, password };

        // Send POST request to backend
        const response = await axios.post("http://localhost:5000/users/login", user,{ withCredentials: true });

        // If registration is successful, navigate to login and dispatch Redux action
        if (response.status === 201 || response.status === 200) {
            dispatch(login(user)); // Dispatch the user data to Redux
            navigate("/home"); // Redirect to login
        }
    } catch (error) {
        console.error("Error registering the user:", error.message);
    }
  };
  return (
    <div>
        <form onSubmit={handlesignup}>
        <div>
            <label>Email:</label>
            <input type="text" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
        </form>
        <p>Dont have an Account?<NavLink to="/register">Signup</NavLink></p>
    </div>
  );
};

export default Login;
