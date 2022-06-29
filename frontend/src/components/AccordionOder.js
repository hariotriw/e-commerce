import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../actions/AuthenticationAction";
import { getUserOrder, orderCart, payOrder, finishOrder, cancelOrder } from "../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button, Form } from "react-bootstrap";

const AccordionOrder = ({ order, i }) => {
    const navigate = useNavigate()
	const dispatch = useDispatch()

	const { getUserCartLoading, getUserCartResult, getUserCartError,
            checkoutCartLoading, checkoutCartResult, checkoutCartError } = useSelector((state) => state.UserReducer)

    let [city, setCity] = useState('')
    let [address, setAddress] = useState('')



    // console.log(city)
    // console.log(order)
    // console.log(i)
    let totalDue = 0

    let orderHandle = ({city, address, order}) => {
		// console.log('checkout handle');
        // console.log(order);
		let orderData = {
            shopCartId: order.LineItems[0].ShoppingCartId, city, address, OrderName: order.name
		}
        // console.log(orderData);
		dispatch(orderCart(orderData))
	}

    let payOrderHandle = ({ order}) => {
		// console.log('checkout handle'); 
        // shopCartId, payment_transaction, OrderName
        // console.log(order);
		let payOrderData = {
            shopCartId: order.LineItems[0].ShoppingCartId, payment_transaction: order.payment_transaction , OrderName: order.name
		}
        console.log(payOrderData);
		dispatch(payOrder(payOrderData))
	}

    let finishOrderHandle = ({ order}) => {
		// console.log('checkout handle'); 
        // shopCartId, OrderName
        // console.log(order);
		let finishOrderData = {
            shopCartId: order.LineItems[0].ShoppingCartId, OrderName: order.name
		}
        console.log(finishOrderData);
		dispatch(finishOrder(finishOrderData))
	}

    let cancelOrderHandle = ({ order}) => {
		// console.log('checkout handle'); 
        // shopCartId, OrderName
        // console.log(order);
		let cancelOrderData = {
            shopCartId: order.LineItems[0].ShoppingCartId, OrderName: order.name
		}
        console.log(cancelOrderData);
		dispatch(cancelOrder(cancelOrderData))
	}

    return (
        <div className="accordion-item mb-3" key={order.id}>
            { order ? 
            <>
                <h2 className="accordion-header" id={ `heading-${i+1}` }>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={ `#collapse-${i+1}`} aria-expanded="true" aria-controls={ `collapse-${i+1}`}>
                        Shopping order {i+1}
                    </button>
                </h2>
            </>
            : <>
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Shopping order
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
                        <p className="hidden">Id shopping order : {order ? order.id : 'shopping order'} </p>
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
                                {order ? order.LineItems.map((lite, i) => {
                                    let totalHarga = +lite.Product.price * +lite.quantity
                                    totalDue = totalDue + totalHarga
                                    return (
                                        <tr key={lite.id}>
                                            <td>{i+1}</td>
                                            <td>{lite ? lite.Product.name : 'nama barang'}</td>
                                            <td>{lite ? 'https://via.placeholder.com/150' : 'gambar barang'}</td>
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
                        <p className="d-flex ms-auto me-1">Sub Total : Rp {totalDue ? totalDue : 0} </p>
                    </div>
                    <div className="d-flex">
                        <p className="d-flex ms-auto me-1">Discount : {order ? order.discount : 0} %</p>
                    </div>
                    <div className="d-flex">
                        <p className="d-flex ms-auto me-1">Tax : {order ? order.tax : 0} %</p>
                    </div>
                    <div className="d-flex">
                        <p className="d-flex ms-auto me-1">Total Paid : Rp {order ? order.totaldue : 0} </p>
                    </div>
                    <div>
                        <h4 className="mb-4">Informasi Order</h4>
                    </div>
                    <div>
                        <p>Order name : {order ? order.name : 'order name'} </p>
                    </div>
                    <div>
                        <p>Payment transaction: : { order ? order.payment_transaction === '' || order.payment_transaction === null ? '-waiting to order-' : order.payment_transaction : 'failed to fetching payment transaction'} </p>
                    </div>
                    {order ?
                    order.status === "open" ? 
                        order.payment_transaction === '' || order.payment_transaction === null ? 
                        <>
                        {/* Sebelum di order */}
                        <div className="">
                            <h5>Fill the Destination </h5>
                            <form>

                            <div className="mb-2 col-6">
                                <Form.Control className="" type="text" id="inputAddress" name="address" placeholder="Address destionation" value={address}  onChange={(event) => setAddress(event.target.value)} required/> 
                            </div>
                            <div className="mb-2 col-6">
                                <Form.Control className="" type="text" id="inpuCity" name="city" placeholder="City destination" value={city}  onChange={(event) => setCity(event.target.value)} required/>
                            </div>
                            </form>
                           
                        </div>
                        {/* <span className="badge bg-success">Order Status: Order has been finished</span> */}
                        <div className="d-flex mt-3">
                            <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order, address, city})}>Order</Button>
                        </div>
                        </> :
                        <>
                        {/* setelah diorder, harus dibayar */}
                        <div className="d-flex mt-3">
                            <Button className="d-flex ms-auto me-1 px-5" onClick={() => payOrderHandle({order})}>Pay</Button>
                        </div>
                        </>
                        : 
                        order.status === "paid" ?
                            // <div className="d-flex">
                            //     <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order})}>Pay Order</Button>
                            // </div> :
                            <>
                            <span className="badge bg-secondary">Order Status: Order has been paid, wating admin to shipping the package.</span>
                            <div className="d-flex mt-3">
                                <Button className="d-flex btn-danger ms-auto me-1 px-5" onClick={() => cancelOrderHandle({order})}>Cancel Order</Button>
                            </div>
                            </> :
                                order.status === "shipping" ?
                                <>
                                <span className="badge bg-info">Order Status: Order is being shipped</span>
                                <div className="d-flex mt-3">
                                    <Button className="d-flex ms-auto me-1 px-5 btn-success" onClick={() => finishOrderHandle({order})}>Finish Transaction</Button>
                                </div>
                                </> :
                                    order.status === "closed" ?
                                    <>
                                    <div className="ms-5">
                                        <h5>Order Destination </h5>
                                        <p>{ order ? order.address : 'address..'}</p>
                                        <p>{ order ? order.city : 'city..'}</p>
                                    </div>
                                        <span className="badge bg-success">Order Status: Order has been finished</span>
                                    </> :
                                        order.status === "cancelled" ?
                                        <span className="badge bg-danger">Order Status: Order has been cancelled</span>:
                                            'order status invalid'
                : 'end'}
                    {/* <div className="d-flex">
                        <Button className="d-flex ms-auto me-1 px-5" onClick={() => orderHandle({order})}>Order</Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AccordionOrder;
