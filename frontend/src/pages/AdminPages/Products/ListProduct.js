import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../../actions/AuthenticationAction";
import { adminGetAllProduct } from "../../../actions/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

const ListProduct = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { getDataUserResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
		dispatch(adminGetAllProduct())
	}, [dispatch])

	// useEffect(() => {
	// 	if(loginStatusResult){
	// 		if(loginStatusResult.status === false) {
	// 			navigate('/login')
	// 		}
	// 	}
		
	// }, [loginStatusResult])

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

	// console.log(adminGetAllProductResult);

	// if (loginStatusResult.status === false) {
	// 	navigate('/login')
	// }

	return (
		<div>
			<div className="row pt-5">
				<div className="col-12 d-flex">
					<h3 className="page-title"> Produk List </h3>
					<div className="button d-flex ms-auto me-0 pe-3">
						<Button variant="outline-primary" href="/admin/addproduct">+ Tambah Produk</Button>
					</div>
				</div>
			</div>
			<div className="row pt-4">
				<div className="col-lg-12 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-hover table-responsive" style={{ width: "100%" }}>
									<thead>
										<tr>
											<th>No</th>
											<th>Nama Produk</th>
											<th>Deskripsi</th>
											<th>Harga</th>
											<th>Stok</th>
											<th>Kadaluwarsa</th>
											<th>Berat</th>
											<th>Kategori</th>
											<th>Brand</th>
											<th>Kondisi</th>
											<th>Total Dijual</th>
											<th>Rating</th>
											<th>Dilihat</th>
											<th>Penjual</th>
											<th >Action</th>
										</tr>
									</thead>
									<tbody>
										{ adminGetAllProductResult ? 
											adminGetAllProductResult.products.map((product, i) => {
												return (
													<tr>
													<td>{i+1}</td>
													<td>{product.name}</td>
													<td>{product.desc}</td>
													<td>Rp {product.price} </td>
													<td>{product.stock}</td>
													<td>{product.expire}</td>
													<td>{product.weight} gram</td>
													<td>{product.category}</td>
													<td>{product.brand}</td>
													<td>{product.condition}</td>
													<td>{product.total_sold}</td>
													<td>{product.rating}</td>
													<td>{product.views}</td>
													<td>{product.User.name}</td>
													<td>
														{/* <Link className="no-link" to={`/editproduct`}>
															<img src={require('../../../assets/images/pencil-938.png')} alt='Responsive image' width='5%' className="img-responsive" />
														</Link>
														|
														<Link className="no-link" to={`/deleteproduct`}>
															<img src={require('../../../assets/images/garbage-bin-10420.png')} alt='Responsive image' width='5%' className="img-responsive" />
														</Link> */}
														<Link className="no-link" to={`/admin/editproduct/${product.id}`}>
															<span>edit</span>
														</Link>
														{/* |
														<Link className="no-link" to={`/admin/deleteproduct`}>
															<span>hapus</span>
														</Link> */}
													</td>
												</tr>
												)}
										) : adminGetAllProductLoading ? 'sedang mengambil data..' : 
										adminGetAllProductError ? 'terjadi kesalahan' :
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

export default ListProduct