import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../actions/AuthenticationAction";
import { getUserOrder } from "../../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";
import Product from "../../components/Product";
import ProductLogin from "../../components/ProductLogin";
import AccordionOrder from "../../components/AccordionOder";

const UserOrder = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
    let [image, setImage] = useState("https://via.placeholder.com/150")
    let newArr = []

	const { getDataUserResult, loginStatusResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)
	const { getUserOrderLoading, getUserOrderResult, getUserOrderError,
        orderCartLoading, orderCartResult, orderCartError,
        payOrderLoading, payOrderResult, payOrderError,
        finishOrderLoading, finishOrderResult, finishOrderError,
        cancelOrderLoading, cancelOrderResult, cancelOrderError} = useSelector((state) => state.UserReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
		dispatch(getUserOrder())
	}, [dispatch])

    // console.log(getDataUserResult);

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

    useEffect(() => {
        // console.log(orderCartResult);

		if(orderCartResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil melakukan order'
				});  
            window.location.reload()
			// dispatch(getUserOrder())
		}

		if(orderCartError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal melakukan order'
				});  
			dispatch(getUserOrder())
		}
	}, [orderCartResult, dispatch])

    useEffect(() => {
        // console.log(orderCartResult);

		if(payOrderResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil melakukan pembayaran'
				});  
            window.location.reload()
			// dispatch(getUserOrder())
		}

		if(payOrderError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal melakukan pembayaran'
				});  
			dispatch(getUserOrder())
		}
	}, [payOrderResult, dispatch])

    useEffect(() => {
        // console.log(orderCartResult);

		if(finishOrderResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil menyelesaikan transaksi'
				});  
            window.location.reload()
			// dispatch(getUserOrder())
		}

		if(finishOrderError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal menyelesaikan transaksi'
				});  
			dispatch(getUserOrder())
		}
	}, [finishOrderResult, dispatch])

    useEffect(() => {
        // console.log(orderCartResult);

		if(cancelOrderResult === true){
			// swal result
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil membatalkan order'
				});  
            window.location.reload()
			// dispatch(getUserOrder())
		}

		if(cancelOrderError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Gagal membatalkan order'
				});  
			dispatch(getUserOrder())
		}
	}, [cancelOrderResult, dispatch])

	return (
        <div className="row pt-5 justify-content-center">
            <div className="col-10 ">
                <div className="row pb-4">
                    <h3 className="page-title"> My order </h3>
                    <hr />
                </div>
                <div className="row p-0 m-0 mb-4">
                    <div className="accordion" id="accordionExample">
                        {/* {console.log(getUserOrderResult)} */}
                        { getUserOrderResult ? getUserOrderResult.length !== 0 ? getUserOrderResult.map((order, i) => {
                            let totalDue = 0
                            // let [city1, setCity] = useState(1)
                            // console.log(city1);
                            return <AccordionOrder order={order} i={i} key={order.id}/>
                            // return (
                            //         <div className="accordion-item mb-3" key={order.id}>
                            //             { order ? 
                            //             <>
                            //                 <h2 className="accordion-header" id={ `heading-${i+1}` }>
                            //                     <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={ `#collapse-${i+1}`} aria-expanded="true" aria-controls={ `collapse-${i+1}`}>
                            //                         Shopping order {i+1}
                            //                     </button>
                            //                 </h2>
                            //             </>
                            //             : <>
                            //                 <h2 className="accordion-header" id="headingOne">
                            //                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            //                     Shopping order
                            //                 </button>
                            //             </h2>
                            //             </>}
                                        
                            //             <div id={ `collapse-${i+1}`} className="accordion-collapse collapse show" aria-labelledby="{ `heading-${i+1}`" data-bs-parent="#accordionExample">
                            //                 <div className="accordion-body">
                            //                     {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                            //                     <div>
                            //                         <h4 className="mb-4">Barang yang dipesan</h4>
                            //                     </div>
                            //                     <div>
                            //                         <p className="hidden">Id shopping order : {order ? order.id : 'shopping order'} </p>
                            //                     </div>
                            //                     <div>
                            //                         <table className="table table-hover">
                            //                             <thead>
                            //                                 <tr>
                            //                                     <th>No</th>
                            //                                     <th>nama barang</th>
                            //                                     <th>contoh gambar</th>
                            //                                     <th>deskripsi</th>
                            //                                     <th>kondisi</th>
                            //                                     <th>jumlah barang</th>
                            //                                     <th>harga</th>
                            //                                     <th>Total harga barang</th>
                            //                                 </tr>
                            //                             </thead>
                            //                             <tbody>
                            //                                 {order ? order.LineItems.map((lite, i) => {
                            //                                     let totalHarga = +lite.Product.price * +lite.quantity
                            //                                     totalDue = totalDue + totalHarga
                            //                                     return (
                            //                                         <tr key={lite.id}>
                            //                                             <td>{i+1}</td>
                            //                                             <td>{lite ? lite.Product.name : 'nama barang'}</td>
                            //                                             <td>{lite ? 'https://via.placeholder.com/150' : 'gambar barang'}</td>
                            //                                             <td>{lite ? lite.Product.desc : 'deskripsi barang'}</td>
                            //                                             <td>{lite ? lite.Product.condition : 'kondisi barang'}</td>
                            //                                             <td>{lite ? lite.quantity : 'jumlah barang'}</td>
                            //                                             <td>{lite ? `Rp ${lite.Product.price}` : 'harga barang'}</td>
                            //                                             <td>{totalHarga}</td>
                            //                                             {/* <td>{lite ? `Rp `(lite.Product.price * lite.quantity) : 
                            //                                             'nama barang'}
                            //                                             </td> */}
                            //                                         </tr>
                            //                                     )
                            //                                 }) 
                            //                                 : 'Loading items'}
                            //                         </tbody>
                            //                         </table>
                            //                         {/* <p>nama barang 1 => gambar primary => Deskripsi produk => Kondisi => kuantitas x2 => harga Rp 75000 => total Rp 150000 </p>
                            //                         <p>nama barang 2 => gambar primary => Deskripsi produk => Kondisi => kuantitas x4 => harga Rp 50000 => total Rp 200000 </p>
                            //                         <p>nama barang 3 => gambar primary => Deskripsi produk => Kondisi => kuantitas x1 => harga Rp 100000 => total Rp 100000 </p> */}
                            //                     </div>
                            //                     <div className="d-flex">
                            //                         <p className="d-flex ms-auto me-1">Sub Total : Rp {totalDue ? totalDue : 0} </p>
                            //                     </div>
                            //                     <div className="d-flex">
                            //                         <p className="d-flex ms-auto me-1">Discount : {order ? order.discount : 0} %</p>
                            //                     </div>
                            //                     <div className="d-flex">
                            //                         <p className="d-flex ms-auto me-1">Tax : {order ? order.tax : 0} %</p>
                            //                     </div>
                            //                     <div className="d-flex">
                            //                         <p className="d-flex ms-auto me-1">Total Paid : Rp {order ? order.totaldue : 0} </p>
                            //                     </div>
                            //                     <div>
                            //                         <h4 className="mb-4">Informasi Order</h4>
                            //                     </div>
                            //                     <div>
                            //                         <p>Order name : {order ? order.name : 'order name'} </p>
                            //                     </div>
                            //                     {order ?
                            //                     order.status === "open" ?
                            //                         <div className="d-flex">
                            //                             <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order})}>Order</Button>
                            //                         </div> :
                            //                         order.status === "paid" ?
                            //                             <div className="d-flex">
                            //                                 <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order})}>Pay Order</Button>
                            //                             </div> :
                            //                              order.status === "shipping" ?
                            //                                 'order status shipping':
                            //                                  order.status === "closed" ?
                            //                                     <>
                            //                                     <div className="ms-5">
                            //                                         <h5>Order Destination </h5>
                            //                                         <p>{ order ? order.address : 'address..'}</p>
                            //                                         <p>{ order ? order.city : 'city..'}</p>
                            //                                     </div>
                            //                                         <span className="badge bg-success">Order Status: Order has been finished</span>
                            //                                     </> :
                            //                                      order.status === "cancelled" ?
                            //                                         'order status cancelled':
                            //                                             'order status invalid'
                            //                 : 'end'}
                            //                     {/* <div className="d-flex">
                            //                         <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order})}>Order</Button>
                            //                     </div> */}
                            //                 </div>
                            //             </div>
                            //         </div>
                            //     )
                        }) : 'order kosong'
                            : getUserOrderLoading ?
                                <>
                                <div className="accordion-item mb-3">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Loading data shopping order... a
                                        </button>
                                    </h2>
                                </div>
                                </> 
                                : getUserOrderError ?
                                    <>
                                    <div className="accordion-item mb-3">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Failed to load shopping order... b
                                            </button>
                                        </h2>
                                    </div>
                                    </> 
                        : 
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Loading data shopping order... c
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

export default UserOrder