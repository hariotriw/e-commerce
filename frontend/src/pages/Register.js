import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "../actions/AuthenticationAction";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../actions/AuthenticationAction";

const Register = () => {
	const navigate = useNavigate()
	const { loginStatusResult } = useSelector((state) => state.AuthReducer)
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

	useEffect(() => {
		dispatch(loginStatus())

	}, [dispatch])

	if(loginStatusResult.status === true) {
		navigate('/')
	}

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handle submit');
        dispatch(registerAction({username: username, email: email, name: name, password:password, repassword:repassword}))
    }

	return (
		<>
			<section className="" id="Authenticate">
				<div className="container-fluid">
					<div className="col col-6 pt-3 mx-auto " style={{ minHeight: "100vh" }}>
						<div className="col col-8 py-5 mx-auto " style={{ minHeight: "100vh" }}>
							<div className="card rounded-3">
								<div className="card-header text-center">
									<h5>Register</h5>
								</div>
								<form onSubmit={(event) => handleSubmit(event)}>
									<div className="card-body py-3">
										<div className="mb-2">
											<label  className="col-sm-6 col-form-label">Username</label>
											<input type="text" className="form-control" name="username" value={username} onChange={(event) => setUsername(event.target.value)} required/>
										</div>
										<div className="mb-2">
											<label  className="col-sm-6 col-form-label">Email</label>
											<input type="text" className="form-control" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
										</div>
										<div className="mb-2">
											<label  className="col-sm-6 col-form-label">Name</label>
											<input type="text" className="form-control" name="name" value={name} onChange={(event) => setName(event.target.value)} required/>
										</div>
										<div className="mb-2">
											<label  className="col-sm-6 col-form-label">Password</label>
											<input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} name="password" required/>
										</div>
										<div className="mb-1">
											<label  className="col-sm-6 col-form-label">Konfirmasi Password</label>
											<input type="password" className="form-control" name="repassword" value={repassword} onChange={(event) => setRepassword(event.target.value)} required/>
										</div>
									</div>
									<div className="card-footer d-flex py-3">
										<p className="fs-6 my-auto me-auto">Klik disini untuk <Link className="no-link" to="/login">Login</Link></p>
										{/* <Link className="btn btn-primary ms-auto" to="/">register</Link> */}
										<button type="submit" className="btn btn-primary ms-auto">register</button>
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

export default Register;
