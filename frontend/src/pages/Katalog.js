import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../actions/AuthenticationAction";
import { katalogAllProduct } from "../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";
import Product from "../components/Product";
import ProductLogin from "../components/ProductLogin";

const Katalog = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
    let [image, setImage] = useState("https://via.placeholder.com/150")
    let [selCategory, setSelCategory] = useState("")

    let newArr = []

	const { getDataUserResult, loginStatusResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)
	const { katalogAllProductLoading, katalogAllProductResult, katalogAllProductError,
        addItemToCartLoading, addItemToCartResult, addItemToCartError } = useSelector((state) => state.UserReducer)

    useEffect(() => {
		if(addItemToCartLoading === true){
			//swal loading
			// console.log(adminConfirmOrderLoading);
			Swal.fire({  
				icon: 'info', 
				text: 'Just info!!!'
				});  
		}

		if(addItemToCartResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil menambahkan item ke keranjang'
				});  
            window.location.reload()
			// dispatch(katalogAllProduct())
		}

		if(addItemToCartError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal menambahkan item ke keranjang'
				});  
			dispatch(katalogAllProduct())
		}
	}, [addItemToCartResult, dispatch])

    const checkProductInShoppingCart = () => {
        // newArr => item in user cart
        if(getDataUserResult === undefined){
            console.log('its undefined');
        } else if(getDataUserResult) {
            // console.log(getDataUserResult);
            getDataUserResult.ShoppingCarts.forEach(cart => {
                if(cart.status === "open"){
                    cart.LineItems.forEach(lite => {
                        // console.log(lite.ProductId);
                        // newArr[lite.ProductId] = lite.quantity
                        newArr.push(lite.ProductId)
                        // objek.pid = lite.ProductId
                        // objek.qty = lite.quantity
                        // arrObj.push(lite.quantity)
                    })

                }
                
            })
            // console.log(newArr)

        }
        return newArr
    }
        
    checkProductInShoppingCart()
    // console.log(newArr);

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
        dispatch(katalogAllProduct(""))
	}, [dispatch])

	// ----- Handler Categories Button -----

	// --- Console ---
	const allProductBtnHandler = (e) => {
		// e.preventDefault()
		setSelCategory("")
		dispatch(katalogAllProduct(""))
	}

	const consoleBtnHandler = (e) => {
        // e.preventDefault()
		setSelCategory("Console")
        dispatch(katalogAllProduct("Console"))
    }
	const gameBtnHandler = (e) => {
        // e.preventDefault()
		setSelCategory("Game")
        dispatch(katalogAllProduct("Game"))
    }
	const accessoriesBtnHandler = (e) => {
        // e.preventDefault()
		setSelCategory("Accessories")
        dispatch(katalogAllProduct("Accessories"))
    }
	const otherBtnHandler = (e) => {
        // e.preventDefault()
		setSelCategory("Other")
        dispatch(katalogAllProduct("Other"))
    }


    // console.log(getDataUserResult);

    useEffect(() => {
		// if(getDataUserResult){
		// 	if(getDataUserResult.role === "admin") {
				
		// 	} else if(getDataUserResult.role === "user") {
		// 		// nanti ubah ke navigate katalog
		// 		// navigate('/katalog')
		// 		navigate('/')
		// 	} else {
		// 		navigate('/login')
		// 	}
		// }
	}, [getDataUserResult])


	return (
		<div className="container-fluid p-0 ">
				<div className="row p-0 m-0 mt-4">
					<div className="col-3 px-3">
						<div className="card my-3">
							<div className="card-header">
								<p className="fw-bold text-center my-auto">Kategori</p>
							</div>
							<div className="card-body py-2 fs-6">
								<div className="row p-0 m-0">
									<p className="fw-bold py-2 my-0">Console</p>
									<hr className="p-0 m-2" />
									<Button className="btn btn-secondary py-2 my-2" onClick={(e) => allProductBtnHandler(e)}>Semua Barang</Button>
									{/* <hr className="p-0 m-2" /> */}
									<Button className="btn btn-secondary py-2 my-2" onClick={(e) => consoleBtnHandler(e)}>Console</Button>
									{/* <hr className="p-0 m-2" /> */}
									<Button className="btn btn-secondary py-2 my-2" onClick={(e) => gameBtnHandler(e)}>Video Games</Button>
									{/* <hr className="p-0 m-2" /> */}
									<Button className="btn btn-secondary py-2 my-2" onClick={(e) => accessoriesBtnHandler(e)}>Aksesoris</Button>
									{/* <hr className="p-0 m-2" /> */}
									<Button className="btn btn-secondary py-2 my-2" onClick={(e) => otherBtnHandler(e)}>Lainnya</Button>
									<hr className="p-0 m-2" />
								</div>								
							</div>
						</div>
					</div>
					<div className="col-9">
                        <div className="row p-0 m-0">
                            <div className="container-fluid p-0 m-0"> 
								<div className="row p-0 m-0">
									<p className="fw-bold py-2 my-0">{selCategory ? selCategory : "Semua Barang"}</p>
									<hr className="p-0 m-2 mb-5" />
								</div>
                                <div className="row mx-auto mb-2">
									{console.log(katalogAllProductResult)}
                                    { katalogAllProductResult ? 
                                        katalogAllProductResult.products.map(product => {
                                            // console.log(getDataUserResult);
                                            return (
                                                loginStatusResult.status === true ?
                                                <>
                                                
                                                <ProductLogin product={product} user={getDataUserResult} newArr={newArr} loginStatusResult={loginStatusResult} key={product.id} />
                                                </>
                                                :
												<>
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
                                                <Product product={product} key={product.id} />
												</>
                                            )
                                        }) : katalogAllProductLoading ? 
                                            <p className="text-center"> loading data . . .</p>
                                                : katalogAllProductError ? katalogAllProductError : 'data kosong'
                                    }
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
	);
}

export default Katalog