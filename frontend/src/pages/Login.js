import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "../actions/AuthenticationAction";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../actions/AuthenticationAction";
import Swal from "sweetalert2";

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(loginStatus())
		
	}, [dispatch])
	const { loginActionLoading, loginActionResult, loginActionError, loginStatusResult } = useSelector((state) => state.AuthReducer)
	// if(loginStatusResult.status === true) {
	// 	navigate('/')
	// }
	
	useEffect((e) => {
		if(loginStatusResult){
			if(loginStatusResult.status === true) {
				navigate('/')
			}
		}
		
	}, [loginStatusResult])

	useEffect(() => {
		console.log(loginActionResult);
		// console.log(loginActionError);
		if(loginActionResult === true){
			console.log(loginActionResult);
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil login'
				});  
			navigate('/')
		}		
	}, [loginActionResult, dispatch])

	useEffect(() => {
		// console.log(loginActionResult);
		if(loginActionError.isError === true){
			console.log(loginActionError);
			Swal.fire({  
				title: 'Login failed',
				icon: 'error', 
				text: `${loginActionError.message}`
				});  
		}
		
	}, [loginActionError, dispatch])
	
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handle submit');
        dispatch(loginAction({email: email, password: password}))	
    }
	
	return (
		<>
			<section className="" id="Authenticate">
				<div className="container-fluid">
					<div
						className="col col-6 pt-3 mx-auto "
						style={{ minHeight: "100vh" }}
					>
						<div className="col col-8 pt-5 mx-auto" style={{ minHeight: "100vh" }}>
							<div className="card rounded-3 mt-5">
								<div className="card-header text-center">
									<h5>Login</h5>
								</div>
								{/* <form method="post" action="/login"> */}
								<form onSubmit={(event) => handleSubmit(event)}>
									<div className="card-body py-3">
										<div className="mb-2">
											<label className="col-sm-6 col-form-label">Email</label>
											<input type="email" className="form-control" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
										</div>
										<div className="mb-1">
											<label className="col-sm-6 col-form-label">Password</label>
											<input type="password" className="form-control" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
										</div>
									</div>
									<div className="card-footer d-flex py-3">
										<p className="fs-6 my-auto me-auto">Klik disini untuk <Link className="no-link" to="/register">Register</Link></p>
										{/* <Link className="btn btn-primary ms-auto" to="/">Login</Link> */}
										<button type="submit" className="btn btn-primary ms-auto">Login</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
