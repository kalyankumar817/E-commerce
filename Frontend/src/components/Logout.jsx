import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/')
  };

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
