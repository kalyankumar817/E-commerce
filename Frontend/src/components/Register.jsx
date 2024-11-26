import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlesignup = (e) => {
        e.preventDefault();
        try {
            // Create user object to send to the backend
            const user = { username, email, password };

            // Send POST request to backend
            const response = axios.post("http://localhost:5000/users/register", user);

            // If registration is successful, navigate to login and dispatch Redux action
            if (response.status === 201 || response.status === 200) {
                dispatch(register(user)); // Dispatch the user data to Redux
                navigate("/"); // Redirect to login
            }
        } catch (error) {
            console.error("Error registering the user:", error.message);
        }
    };
    return (
        <div>
            <form onSubmit={handlesignup}>
                <div>
                    <label>Username:</label>
                    <input type="text" placeholder="enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
            </form>
            <p>ALready have an Account?<NavLink to="/">Login</NavLink></p>
        </div>
    );
};

export default Register;
