import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../actions/AuthenticationAction";
import { katalogAllProduct } from "../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";

const ProductBackUp = ({ product, newArr, loginStatusResult }) => {
    const [image, setImage] = useState("https://via.placeholder.com/150")
    const [number, setNumber] = useState(0)
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
                            <Button className="btn btn-secondary my-1 me-1 ms-auto d-flex">-</Button>
                            <input type="number" className="my-1 d-flex mx-auto text-center" style={{ maxWidth: "20%" }} id="inputStock" name="number" value={number} onChange={(event) => setNumber(event.target.value)} required />
                            <Button className="btn btn-secondary my-1 me-0 d-flex">+</Button>
                            <Button className="btn btn-primary my-1 px-3 ms-auto me-1 d-flex"><small>update</small></Button>
                        </div>
                        :
                        <div className="card-footer p-0 mt-2 mx-0 d-flex">
                            <Button className="btn btn-primary w-100"><b>Add to cart</b></Button>
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

                {/* <Button className="btn btn-secondary my-1 ms-2 d-flex">-</Button>
                    <input type="number" className="my-1 d-flex mx-auto text-center" style={{ maxWidth: "20%" }} id="inputStock" name="number"  value={number}  onChange={(event) => setNumber(event.target.value)} required/>
                    <Button className="btn btn-secondary my-1 me-0 d-flex">+</Button>
                    <Button className="btn btn-primary my-1 px-3 ms-auto me-1 d-flex"><small>update</small></Button> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default ProductBackUp;
