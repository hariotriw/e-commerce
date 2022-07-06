import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser, logoutAction } from "../../actions/AuthenticationAction";
import Swal from 'sweetalert2';


const Navbar = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch()
    
	const { getDataUserLoading, getDataUserResult, getDataUserError, loginStatusResult,
        logoutActionResult } = useSelector((state) => state.AuthReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
	}, [dispatch])

	const logoutHandler = (event) => {
        event.preventDefault()
        // console.log('handle submit');
        dispatch(logoutAction())
	}

    useEffect(() => {
		console.log(logoutActionResult);
		// console.log(loginActionError);
		if(logoutActionResult.logoutStatus === true){
            console.log('lalalala');
			console.log(logoutActionResult);
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil logout'
				});  
			// navigate('/')
            window.location.reload()
		}		
	}, [logoutActionResult, dispatch])

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: "#333333" }}>
                <div className='container-fluid'>
                    <Link to="/" className='navbar-brand border border-light px-3 '><i class="bi bi-controller"></i> Console Store</Link>
                    <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarCollapse'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarCollapse'>
                        <div className='navbar-nav ms-auto'>
                            {/* ----- General ----- */}
                            {/* <Link to="#" className='nav-item nav-link active'>Katalog</Link> */}
                            {/* ----- end General ----- */}

                            { getDataUserResult ? 
                                getDataUserResult.role === "user" ? 
                                <>
                                    {/* ----- General ----- */}
                                    <Link to="/" className='nav-item nav-link active'>Katalog</Link>
                                    {/* ----- end General ----- */}
                                    {/* ----- User ----- */}
                                    <Link to="/my-cart" className='nav-item nav-link active'>My Cart</Link>
                                    <Link to="/my-order" className='nav-item nav-link active'>My Order</Link>
                                    {/* <Link to="/my-account" className='nav-item nav-link active'>My Account</Link> */}
                                    <Link to="/profile" className='nav-item nav-link active'>Profile</Link>
                                    {/* ----- end User ----- */}
                                </>  : 
                                getDataUserResult.role === "admin" ?
                                <>
                                    {/* ----- General ----- */}
                                    <Link to="/" className='nav-item nav-link active'>Katalog</Link>
                                    <Link to="/profile" className='nav-item nav-link active'>Profile</Link>
                                    {/* ----- end General ----- */}
                                    {/* ----- Admin ----- */}
                                    {/* <Link to="/admin/dashboard" className='nav-item nav-link active'>Dashboard</Link> */}
                                    {/* <Link to="/admin/profile" className='nav-item nav-link active'>Profile</Link> */}
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">Seller Management</a>
                                        <ul className="dropdown-menu">
                                            <li><Link to='admin/listproduct' className='dropdown-item'>Products</Link></li>
                                            <li><Link to='admin/listorder' className='dropdown-item'>Orders</Link></li>
                                        </ul>
                                    </li>
                                    {/* ----- end Admin ----- */}
                                </> : 
                                <>
                                <Link to="/" className='nav-item nav-link active'>Katalog</Link>
                                </>
                            // <p className='nav-item nav-link'>silahkan refresh page . . .</p>
                                : 
                                <>
                                <Link to="/" className='nav-item nav-link active'>Katalog</Link>
                                </>
                            }
                            

                            
                        </div>
                        <div className='navbar-nav ms-auto'>
                            
                            {/* { console.log(loginStatusResult.status)} */}
                            { loginStatusResult.status ===true ? 
                            /* ----- Login ----- */
                                <button className="btn btn-secondary my-2 my-sm-0 text-white ms-auto me-3" type="button"
                                onClick={(event) => logoutHandler(event)}>Logout</button>
                                : 
                                /* ----- Not Login ----- */
                            <Link to="/login" className='nav-item nav-link'>Login</Link>}
                            
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar