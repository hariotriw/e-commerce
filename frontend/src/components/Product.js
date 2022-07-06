import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../actions/AuthenticationAction";
import { katalogAllProduct } from "../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";

const Product = ({ product, newArr, loginStatusResult }) => {
    const [image, setImage] = useState("https://via.placeholder.com/150")
    const [number, setNumber] = useState(0)
    // console.log(user)
    // console.log(newArr)

    useEffect(() => {
		if(product){
            console.log(product)
            if(product.ProductImages.length !== 0){
                setImage(product.ProductImages[0].filename)
            }
        }
		
	}, [product])

    return (
        <div className="col-3 mb-3">
            <div className="card ">
                <div className="card-header">
                    <div className="no-link row p-0 m-0" to='#'>
                        <img src={image} className="img-fluid p-0" alt="..." />
                    </div>
                </div>
                <div className="card-body py-2 fs-6">
                    <div className="row  text-center text-justify ">
                        <p className="py-2 same-line-title my-0"><b>{product ? product.name : 'nama product'}</b></p>
                    </div>
                    <hr className="pt-0 mt-0" />
                    <div className="row">
                        <p className="text-justify same-line-body py-0 my-0">{product ? product.desc : 'deskripsi produk'}</p>
                    </div>
                    <hr className="py-0 my-2" />
                    <div className="row">
                        <p className="text-justify py-0 my-0">harga: <b>Rp {product ? product.price : 'tidak ada harga'}</b></p>
                    </div>
                    {/* <div className="row">
                        <p className="text-justify py-0 my-0">brand: <b>{product ? product.brand : 'tidak ada brand'}</b></p>
                    </div> */}
                    <div className="row">
                        <p className="text-justify py-0 my-0">sisa stock: <b>{product ? product.stock : 'tidak ada stock'}</b></p>
                    </div>
                </div>
                <div className="card-footer p-0 mt-2 mx-0 d-flex">
                    <Link className="btn btn-primary w-100" to="/login"><b>Add to cart</b></Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
