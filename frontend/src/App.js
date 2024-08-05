import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Products/ProductList'
import AddProduct from './addProduct/AddProduct'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import Home from './component/Home';

export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path="/" element={<ProductList />} /> */}
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
  
}
