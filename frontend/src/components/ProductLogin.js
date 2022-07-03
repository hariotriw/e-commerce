import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../actions/AuthenticationAction";
import { katalogAllProduct, addItemToCart } from "../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";

const ProductLogin = ({ product, newArr, user, loginStatusResult }) => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
	const { katalogAllProductLoading, katalogAllProductResult, katalogAllProductError,
        addItemToCartLoading, addItemToCartResult, addItemToCartError } = useSelector((state) => state.UserReducer)

    const [image, setImage] = useState("https://via.placeholder.com/150")
    const [number, setNumber] = useState(0)

    let lite = undefined
    if(user){
        user.ShoppingCarts.forEach(cart => {
            if(cart.status === "open"){
                // console.log(cart.LineItems);
                lite = cart.LineItems
            }
            
        })
    }

    let addToCartHandle = ({product}) => {
		// console.log('confirm handle');
        // console.log(lite);
		let itemData = {
            ProductId: product.id,
			quantity: 1
		}
        // console.log(itemData);
        // console.log(product.id);
		dispatch(addItemToCart(itemData))
	}
    // console.log(lite[0].ProductId);

    useEffect(() => {
		if(product){
            console.log(product)
            if(product.ProductImages.length !== 0){
                setImage(product.ProductImages[0].filename)
            }
        }
		
	}, [product])

    // console.log(user)
    // console.log(newArr)

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
                {/* <div className="card-footer p-0 mt-2 mx-0 d-flex"> */}
                {/* {product.id === ? product.stock : 'tidak ada stock'} */}
                {/* {product. === ? product.stock : 'tidak ada stock'} */}
                {/* <Button className="btn btn-primary w-100"><b>Add to cart</b></Button> */}
                
                {loginStatusResult ? loginStatusResult.status === true ?
                    newArr.includes(product.id) ?
                        <div className="card-footer p-0 mt-2 mx-0 d-flex">
                            <Button className="btn btn-danger w-100"><i className="bi bi-cart-check-fill"></i> <b>Added to cart</b></Button>
                        </div>
                        :
                        <div className="card-footer p-0 mt-2 mx-0 d-flex">
                            <Button className="btn btn-primary w-100"onClick={() => addToCartHandle({product})}><b>Add to cart</b></Button>
                        </div>
                    :
                    // login tidak true
                    <div className="card-footer p-0 mt-2 mx-0 d-flex">
                        <Button className="btn btn-primary w-100"><b>Add to cart</b></Button>
                    </div>
                : 
                    // login tidak true
                    <div className="card-footer p-0 mt-2 mx-0 d-flex">
                        <Button className="btn btn-primary w-100"><b>Add to cart</b></Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductLogin;
