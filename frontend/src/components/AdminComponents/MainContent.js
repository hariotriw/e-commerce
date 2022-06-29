import React from 'react'
import { Routes, Route } from 'react-router-dom'

// General
import Login from '../../pages/Login'
import Register from '../../pages/Register'

// Admin
import Dashboard from '../../pages/AdminPages/Dashboard'
import Profile from '../../pages/AdminPages/Profile'
import AddProduct from '../../pages/AdminPages/Products/AddProduct'
import ListProduct from '../../pages/AdminPages/Products/ListProduct'
import EditProduct from '../../pages/AdminPages/Products/EditProduct'
import DeleteProduct from '../../pages/AdminPages/Products/DeleteProduct'
import ListOrder from '../../pages/AdminPages/Orders/ListOrder'
import Katalog from '../../pages/Katalog'
import UserCart from '../../pages/UserPages/UserCart'
import UserOrder from '../../pages/UserPages/UserOrder'
import UserPayOrder from '../../pages/UserPages/UserPayOrder'

const MainContent = () => {

    return (
        <>
            <div className='container-fluid'>
            <Routes>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/profile" element={<Profile></Profile>}></Route>

                {/* --- Admin --- */}
                <Route path="/admin/dashboard" element={<Dashboard></Dashboard>}></Route>
                <Route path="/admin/addproduct" element={<AddProduct></AddProduct>}></Route>
                <Route path="/admin/listproduct" element={<ListProduct></ListProduct>}></Route>
                <Route path="/admin/editproduct/:id" element={<EditProduct></EditProduct>}></Route>
                {/* <Route path="/admin/editproduct" element={<EditProduct></EditProduct>}></Route> */}
                <Route path="/admin/deleteproduct" element={<DeleteProduct></DeleteProduct>}></Route>
                <Route path="/admin/listorder" element={<ListOrder></ListOrder>}></Route>
                
                {/* --- User --- */}
                <Route path="/" element={<Katalog></Katalog>}></Route>
                <Route path="/my-cart" element={<UserCart></UserCart>}></Route>
                <Route path="/my-order" element={<UserOrder></UserOrder>}></Route>
                <Route path="/pay-order" element={<UserPayOrder></UserPayOrder>}></Route>
            </Routes>
            </div>
        </>
    );
}

export default MainContent