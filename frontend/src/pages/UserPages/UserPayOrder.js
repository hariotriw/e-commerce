import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../actions/AuthenticationAction";
import { katalogAllProduct } from "../../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";
import Product from "../../components/Product";
import ProductLogin from "../../components/ProductLogin";

const UserPayOrder = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
    let [image, setImage] = useState("https://via.placeholder.com/150")
    let newArr = []

	const { getDataUserResult, loginStatusResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)
	const { katalogAllProductLoading, katalogAllProductResult, katalogAllProductError,
        addItemToCartLoading, addItemToCartResult, addItemToCartError } = useSelector((state) => state.UserReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
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

	return (
        <div className="row pt-5 justify-content-center">
            <div className="col-10 ">
                <div className="row pb-4">
                    <h3 className="page-title"> Pay Order </h3>
                    <hr />
                </div>
                <div className="row p-0 m-0 mb-4">
                    <div class="accordion" id="accordionExample">

                        <div class="accordion-item mb-3">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Shopping Cart #1
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
                                    <div>
                                        <h4 className="mb-4">Barang yang dipesan</h4>
                                    </div>
                                    <div>
                                        <p>Id shopping cart : 12 *nanti dihide </p>
                                    </div>
                                    <div>
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <td>nama barang 1</td>
                                                <td>gambar primary</td>
                                                <td>Deskripsi produk</td>
                                                <td>Kondisi</td>
                                                <td>kuantitas x2</td>
                                                <td>harga Rp 75000</td>
                                                <td>total Rp 150000</td>
                                                <td>Transaksi Pembayaran</td>
                                            </tr>
                                            <tr>
                                                <td>nama barang 1</td>
                                                <td>gambar primary</td>
                                                <td>Deskripsi produk</td>
                                                <td>Kondisi</td>
                                                <td>kuantitas x2</td>
                                                <td>harga Rp 75000</td>
                                                <td>total Rp 150000</td>
                                                <td>Transaksi Pembayaran</td>
                                            </tr>
                                            <tr>
                                                <td>nama barang 1</td>
                                                <td>gambar primary</td>
                                                <td>Deskripsi produk</td>
                                                <td>Kondisi</td>
                                                <td>kuantitas x2</td>
                                                <td>harga Rp 75000</td>
                                                <td>total Rp 150000</td>
                                                <td>Transaksi Pembayaran</td>
                                            </tr>
									</tbody>
                                    </table>
                                        {/* <p>nama barang 1 => gambar primary => Deskripsi produk => Kondisi => kuantitas x2 => harga Rp 75000 => total Rp 150000 </p>
                                        <p>nama barang 2 => gambar primary => Deskripsi produk => Kondisi => kuantitas x4 => harga Rp 50000 => total Rp 200000 </p>
                                        <p>nama barang 3 => gambar primary => Deskripsi produk => Kondisi => kuantitas x1 => harga Rp 100000 => total Rp 100000 </p> */}
                                    </div>
                                    <div>
                                        <p>Total Harga : Rp 450000 </p>
                                    </div>
                                    <div>
                                        <Button className="">Checkout</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
            </div>
        </div>
	);
}

export default UserPayOrder