import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import Logout from './components/Logout';
import Products from './components/Products';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { validateSession } from './redux/AuthSlice'; // Adjust the path to your slice
import { useEffect } from 'react';

const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(validateSession());
    }, [dispatch]);
    return (
        <>
        <main>
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/products' element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </main>
        </>
    )
}

export default App
