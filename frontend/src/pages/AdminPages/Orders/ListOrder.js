import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../../actions/AuthenticationAction";
import { adminGetAllOrder, adminConfirmOrder } from "../../../actions/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

const ListOrder = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { getDataUserResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllOrderLoading, adminGetAllOrderResult, adminGetAllOrderError,
		adminConfirmOrderLoading, adminConfirmOrderResult, adminConfirmOrderError } = useSelector((state) => state.AdminReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
		dispatch(adminGetAllOrder())
	}, [dispatch])

	useEffect(() => {
		if(getDataUserResult){
			if(getDataUserResult.role === "admin") {
				
			} else if(getDataUserResult.role === "user") {
				// nanti ubah ke navigate katalog
				// navigate('/katalog')
				navigate('/')
			} else {
				navigate('/login')
			}
		}
	}, [getDataUserResult])

	useEffect(() => {
		if(adminConfirmOrderLoading === true){
			//swal loading
			// console.log(adminConfirmOrderLoading);
			Swal.fire({  
				icon: 'info', 
				text: 'Just info!!!'
				});  
		}

		if(adminConfirmOrderResult ===true){
			// swal result
			// console.log(adminConfirmOrderResult);
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil mengkonfirmasi pesanan'
				});  
			dispatch(adminGetAllOrder())
		}

		if(adminConfirmOrderError === true){
			// swal error
			// console.log(adminConfirmOrderError);
			Swal.fire({  
				icon: 'error', 
				text: 'Error mengkonfirmasi pesanan'
				});  
			dispatch(adminGetAllOrder())
		}
	}, [adminConfirmOrderResult, dispatch])

	let confirmHandle = (order) => {
		// console.log('confirm handle');
		// console.log(order.order.LineItems[0].ShoppingCartId);
		let confirmData = {
			shopCartId: order.order.LineItems[0].ShoppingCartId, 
			UserId: order.order.UserId, 
			OrderName: order.order.name
		}
		dispatch(adminConfirmOrder(confirmData))
	}

	// console.log(adminGetAllOrderResult);

	// if (loginStatusResult.status === false) {
	// 	navigate('/login')
	// }

	return (
		<div>
			<div className="row pt-5">
				<div className="col-12 d-flex">
					<h3 className="page-title"> List Orders </h3>
				</div>
			</div>
			<div className="row pt-4">
				<div className="col-lg-12 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-hover">
									<thead>
										<tr>
											<th>No</th>
											<th>Nama Order</th>
											<th>Sub Total</th>
											<th>Discount</th>
											<th>Tax</th>
											<th>Total Due</th>
											<th>Jumlah Barang</th>
											<th>Transaksi Pembayaran</th>
											<th>Kota</th>
											<th>Alamat</th>
											<th>Nama Pembeli</th>
											<th>Barang dibeli</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{/* <tr>
											<td>Jacob</td>
											<td>Photoshop</td>
											<td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down"></i></td>
											<td>1</td>
											<td>2</td>
											<td>3</td>
											<td>4</td>
											<td>5</td>
											<td>6</td>
											<td>7</td>
											<td><span className="badge bg-danger">pending</span></td>
										</tr> */}
										{ adminGetAllOrderResult ? 
											adminGetAllOrderResult.orders.map((order, i) => {
												return (
												<tr>
													<td>{i+1}</td>
													<td>{order.name}</td>
													<td>Rp {order.subtotal}</td>
													<td>{order.discount}% </td>
													<td>{order.tax}%</td>
													<td>Rp {order.totaldue}</td>
													<td>{order.totalquantity}</td>
													<td>{order.payment_transaction}</td>
													<td>{order.city}</td>
													<td>{order.address}</td>
													<td>{order.User.name}</td>
													<td><ul>
														{order.LineItems.map(lite => {
															return (
																<li>{lite.Product.name} x{lite.quantity}</li>
															)
														})}	
													</ul></td>
													{/* open, cancelled, paid, shipping, closed */}
													<td>
													{/* <span className="badge bg-danger">pending</span> */}
														{order.status === "open" ? <span className="badge bg-primary">{order.status}</span> :
															order.status === "cancelled" ? <span className="badge bg-danger">{order.status}</span> :
																order.status === "paid" ? <span className="badge bg-warning text-dark">{order.status}</span> :
																	order.status === "shipping" ? <span className="badge bg-info text-dark">{order.status}</span> :
																		order.status === "closed" ? <span className="badge bg-success">{order.status}</span>
														: <span className="badge bg-danger">status error</span>}
													</td>
													<td>
														{/* <Link className="no-link" to={`/lihatorder`}>
															<img src={require('../../../assets/images/pencil-938.png')} alt='Responsive image' width='5%' className="img-responsive" />
														</Link>
														<Link className="no-link" to={`/editorder`}>
															<img src={require('../../../assets/images/pencil-938.png')} alt='Responsive image' width='5%' className="img-responsive" />
														</Link>
														|
														<Link className="no-link" to={`/deleteorder`}>
															<img src={require('../../../assets/images/garbage-bin-10420.png')} alt='Responsive image' width='5%' className="img-responsive" />
														</Link> */}
														{order.status === "paid" ? 
															<button className="no-link btn btn-sm btn-primary" onClick={() => confirmHandle({order})}>
																<span>confirm</span>
															</button> 
															: 'no action needed'}
														{/* <Link className="no-link" to={`/lihatorder`}>
															<span>lihat</span>
														</Link>
														/\
														<Link className="no-link" to={`/editorder`}>
															<span>edit</span>
														</Link>
														/\
														<Link className="no-link" to={`/deleteorder`}>
															<span>hapus</span>
														</Link> */}
													</td>
												</tr>
												)}
										) : adminGetAllOrderLoading ? 'sedang mengambil data..' : 
										adminGetAllOrderError ? 'terjadi kesalahan' :
										'data kosong'}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListOrder