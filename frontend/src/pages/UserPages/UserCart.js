import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../actions/AuthenticationAction";
import { getUserCart, checkoutCart, orderCart } from "../../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";
import Product from "../../components/Product";
import ProductLogin from "../../components/ProductLogin";

const UserCart = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
    let [image, setImage] = useState("https://via.placeholder.com/150")
    let newArr = []

	const { getDataUserResult, loginStatusResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)
	const { getUserCartLoading, getUserCartResult, getUserCartError,
            checkoutCartLoading, checkoutCartResult, checkoutCartError } = useSelector((state) => state.UserReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
		dispatch(getUserCart())
	}, [dispatch])

    useEffect(() => {
        // console.log(getDataUserResult);
		// if(getDataUserResult === undefined){
        //     navigate('/login')
        // } else {
		// 	if(getDataUserResult.role === "admin") {
				
		// 	} else if(getDataUserResult.role === "user") {
                
		// 	} else {
				
		// 	}
        // }
	}, [getDataUserResult])

    let checkoutHandle = ({cart}) => {
		// console.log('checkout handle');
        // console.log(cart);
		let cartData = {
            shopCartId: cart.id
		}
		dispatch(checkoutCart(cartData))
	}

    useEffect(() => {
        // console.log(checkoutCartResult);
        // console.log('checkout la la la');

		// if(checkoutCartLoading === true){
		// 	//swal loading
		// 	// console.log(adminConfirmOrderLoading);
		// 	Swal.fire({  
		// 		icon: 'info', 
		// 		text: 'Just info!!!'
		// 		});  
		// }

		if(checkoutCartResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil melakukan checkout keranjang'
				});  
            window.location.reload()
			// dispatch(getUserCart())
		}

		if(checkoutCartError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal melakukan checkout keranjang'
				});  
			dispatch(getUserCart())
		}
	}, [checkoutCartResult, dispatch])

	return (
        <div className="row pt-5 justify-content-center">
            <div className="col-10 ">
                <div className="row pb-4">
                    <h3 className="page-title"> My Cart </h3>
                    <hr />
                </div>
                <div className="row p-0 m-0 mb-4">
                    <div className="accordion" id="accordionExample">
                        { getUserCartResult ? getUserCartResult.length !== 0 ? getUserCartResult.map((cart, i) => {
                            let totalDue = 0
                            return (
                                    <div className="accordion-item mb-3" key={cart.id}>
                                        { cart ? 
                                        <>
                                            <h2 className="accordion-header" id={ `heading-${i+1}` }>
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={ `#collapse-${i+1}`} aria-expanded="true" aria-controls={ `collapse-${i+1}`}>
                                                    Shopping Cart {i+1}
                                                </button>
                                            </h2>
                                        </>
                                        : <>
                                            <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Shopping Cart
                                            </button>
                                        </h2>
                                        </>}
                                        
                                        <div id={ `collapse-${i+1}`} className="accordion-collapse collapse show" aria-labelledby="{ `heading-${i+1}`" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                                                <div>
                                                    <h4 className="mb-4">Barang yang dipesan</h4>
                                                </div>
                                                <div>
                                                    <p className="hidden">Id shopping cart : {cart ? cart.id : 'shopping cart'} </p>
                                                </div>
                                                <div>
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>nama barang</th>
                                                                <th>contoh gambar</th>
                                                                <th>deskripsi</th>
                                                                <th>kondisi</th>
                                                                <th>jumlah barang</th>
                                                                <th>harga</th>
                                                                <th>Total harga barang</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cart ? cart.LineItems.map((lite, i) => {
                                                                let totalHarga = +lite.Product.price * +lite.quantity
                                                                totalDue = totalDue + totalHarga
                                                                return (
                                                                    <tr key={lite.id}>
                                                                        <td>{i+1}</td>
                                                                        <td>{lite ? lite.Product.name : 'nama barang'}</td>
                                                                        <td>{lite ? lite.Product.ProductImages.length !== 0 ? <img src={`${lite.Product.ProductImages[0].filename}` } className="img-fluid p-0" alt="..."/> 
                                                                            : 'produk tidak mempunyai gambar' : 'https://via.placeholder.com/150'}</td>
                                                                        <td>{lite ? lite.Product.desc : 'deskripsi barang'}</td>
                                                                        <td>{lite ? lite.Product.condition : 'kondisi barang'}</td>
                                                                        <td>{lite ? lite.quantity : 'jumlah barang'}</td>
                                                                        <td>{lite ? `Rp ${lite.Product.price}` : 'harga barang'}</td>
                                                                        <td>{totalHarga}</td>
                                                                        {/* <td>{lite ? `Rp `(lite.Product.price * lite.quantity) : 
                                                                        'nama barang'}
                                                                        </td> */}
                                                                    </tr>
                                                                )
                                                            }) 
                                                            : 'Loading items'}
                                                    </tbody>
                                                    </table>
                                                    {/* <p>nama barang 1 => gambar primary => Deskripsi produk => Kondisi => kuantitas x2 => harga Rp 75000 => total Rp 150000 </p>
                                                    <p>nama barang 2 => gambar primary => Deskripsi produk => Kondisi => kuantitas x4 => harga Rp 50000 => total Rp 200000 </p>
                                                    <p>nama barang 3 => gambar primary => Deskripsi produk => Kondisi => kuantitas x1 => harga Rp 100000 => total Rp 100000 </p> */}
                                                </div>
                                                <div className="d-flex">
                                                    <p className="d-flex ms-auto me-1">Total Harga : Rp {totalDue ? totalDue : 0} </p>
                                                </div>
                                                <div className="d-flex">
                                                    <Button className="d-flex ms-auto me-1 px-5" onClick={() => checkoutHandle({cart})}>Checkout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }) : 'cart kosong'
                            : getUserCartLoading ?
                                <>
                                <div className="accordion-item mb-3">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Loading data shopping cart...
                                        </button>
                                    </h2>
                                </div>
                                </> 
                                : getUserCartError ?
                                    <>
                                    <div className="accordion-item mb-3">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Failed to load shopping cart...
                                            </button>
                                        </h2>
                                    </div>
                                    </> 
                        : 
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Loading data shopping cart...
                                </button>
                            </h2>
                        </div>
                        }
                        
                    </div>
				</div>
            </div>
        </div>
	);
}

export default UserCart