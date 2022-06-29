import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser, editProfile, uploadImage } from "../../actions/AuthenticationAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Button } from "react-bootstrap";

const Profile = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { getDataUserResult,
		editProfileLoading, editProfileResult, editProfileError,
		uploadImageResult } = useSelector((state) => state.AuthReducer)
	const { adminGetAllProductLoading, adminGetAllProductResult, adminGetAllProductError } = useSelector((state) => state.AdminReducer)

	let [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar7.png")
    let [saveImage, setSaveImage] = useState(null)
	let [editFlag, setEditFlag] = useState(false)
	let [name, setName] = useState('')
	let [email, setEmail] = useState('')
	let [birthdate, setBirthdate] = useState('')
	let [gender, setGender] = useState('')

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
		// dispatch(adminGetAllProduct())
	}, [dispatch])

	useEffect(() => {
		// console.log(getDataUserResult);
		// setName(getDataUserResult.name)
	}, [getDataUserResult])

	useEffect(() => {
		// console.log(editFlag);
	}, [editFlag])

	useEffect(() => {
		if(editProfileResult === true){
			console.log(editProfileResult);
			
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil mengubah profile'
				});  
			window.location.reload()

		}
	}, [editProfileResult, dispatch])
	
	const flagChangeHandle = (event) => {
		console.log(editFlag)
		setEditFlag(prevCheck => !prevCheck)
		if(editFlag){
			// false
		} else {
			// true
			setName(getDataUserResult.name)
			setEmail(getDataUserResult.email)
			setBirthdate(getDataUserResult.birthdate.slice(0,10))
			setGender(getDataUserResult.gender)

		}
    }

	const editSubmitHandle = (event) => {
		console.log('edit submit handle');
		let data ={
			name, email, birthdate, gender
		}
		console.log(data);
		dispatch(editProfile(data))
    }

	useEffect(() => {
		if(getDataUserResult){
			if(getDataUserResult.role === "admin") {
				
			} else if(getDataUserResult.role === "user") {
				// nanti ubah ke navigate katalog
				// navigate('/katalog')
				// navigate('/')
			} else {
				// navigate('/login')
			}
		} else {
			// navigate('/login')

		}
	}, [getDataUserResult])

	// const handleUploadChange = ((e) => {
    //     console.log(e.target.files[0])
    //     let uploaded = e.target.files[0]
    //     setImage(URL.createObjectURL(uploaded))
	// 	setSaveImage(uploaded)
    //     // dispatch(uploadImage(formData))
    // })

	// const handleSubmit = (event) => {
    //     event.preventDefault()
    //     // console.log('handle submit');
    //     let formData = new FormData()
    //     formData.append('image', saveImage)
    //     console.log(saveImage)
    //     dispatch(uploadImage(saveImage))
    //     return formData
    // }

	// if (loginStatusResult.status === false) {
	// 	navigate('/login')
	// }

	return (
		<div className="container">
			<div className="main-body pt-5">
				<div className="row gutters-sm justify-content-center">
					<div className="col-md-3 mb-3">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column align-items-center text-center">
									{/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} /> */}
									<img src={image} alt="Admin" className="rounded-circle" width={150} />
									{/* { editFlag ? 
									<>
									<form onSubmit={(event) => handleSubmit(event)}>
									<img src={image} alt="Admin" className="rounded-circle" width={150} />
									<div className="row p-0 m-0 mt-3">
										<input className="form-control form-control-sm mb-2" type="file" id="formFile" accept="image/*" onChange={(event) => handleUploadChange(event)}/>
										<button type="submit" className="btn btn-primary ms-auto">Upload</button>
									</div>
									</form>

									</>
									: <img src={image} alt="Admin" className="rounded-circle" width={150} />} */}

									<div className="mt-3">
										<h4>{ getDataUserResult ? `${getDataUserResult.name}` : 'nama...'}</h4>
										<p className="text-secondary mb-1">{ getDataUserResult ? `${getDataUserResult.email}` : 'email...'}</p>
										<p className="text-muted font-size-sm">{ getDataUserResult ? `${getDataUserResult.role}` : 'role...'}</p>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card mb-3">
							<div className="card-body">
								<div className="row">
									<div className="col-sm-3">
										<h6 className="m-0 my-auto">Nama</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										{ editFlag ? 
										<input className="form-control" type="text" id="inputName" name="name" placeholder="Name" value={name}  onChange={(event) => setName(event.target.value)} required/>
										: getDataUserResult ? `${getDataUserResult.name}` : 'name...'}
										{/* { getDataUserResult ? `${getDataUserResult.name}` : 'name...'} */}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Email</h6>
									</div>
									<div className="col-sm-9 text-secondary">
									{ editFlag ? 
										<input className="form-control" type="text" id="inputEmail" name="email" placeholder="Email" value={email}  onChange={(event) => setEmail(event.target.value)} required/>
										: getDataUserResult ? `${getDataUserResult.email}` : 'email...'}
										{/* { getDataUserResult ? `${getDataUserResult.email}` : 'email...'} */}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Tanggal Lahir</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										{/* { getDataUserResult ? `${getDataUserResult.birthdate}` : 'tanggal lahir...'} */}
										{/* { getDataUserResult ? 
											getDataUserResult.birthdate !== null ? `${getDataUserResult.birthdate}` : 'tanggal lahir masih kosong'
										: 'tanggal lahir...'} */}
										{ editFlag ?
										<input className="form-control" type="date" id="inputBirthdate" name="birthdate" placeholder="Birthdate" value={birthdate}  onChange={(event) => setBirthdate(event.target.value)} required/>
										:  getDataUserResult ? 
											getDataUserResult.birthdate !== null ? getDataUserResult.birthdate.slice(0,10) : 'tanggal lahir masih kosong'
											: 'tanggal lahir...'}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Jenis Kelamin</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										{ editFlag ? 
										<>
										{/* <div class="form-check">
											<input className="form-check-input" type="radio" id="inputGender" name="gender" placeholder="Jenis Kelamin" value={gender}  onChange={(event) => setGender(event.target.value)} { getDataUserResult ? getDataUserResult.gender ==="male" ? 'checked' : '' :''}/>
											<label class="form-check-label" for="flexRadioDefault1">Male</label>
										</div>
										<div class="form-check">
											<input className="form-check-input" type="radio" id="inputGender" name="gender" placeholder="Jenis Kelamin" value={gender}  onChange={(event) => setGender(event.target.value)} { getDataUserResult ? getDataUserResult.gender ==="female" ? 'checked' : '' :''}/>
											<label class="form-check-label" for="flexRadioDefault2">Female</label>
									  </div> */}
										<input className="form-control" type="text" id="inputGender" name="gender" placeholder="Jenis Kelamin" value={gender}  onChange={(event) => setGender(event.target.value)} required/>
										</>
										: getDataUserResult ? getDataUserResult.gender === '' || getDataUserResult.gender === null ? 'Jenis kelamin kosong' : `${getDataUserResult.gender}` 
										: 'jenis kelamin..'}
										{/* { getDataUserResult ? `${getDataUserResult.gender}` : 'jenis kelamin..'} */}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Role</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										{ getDataUserResult ? `${getDataUserResult.role}` : 'role...'}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-12 d-flex">
										<div className="form-check form-switch m-0 p-0">
											<input className="form-check-input ms-0 me-auto d-flex" type="checkbox" id="flexSwitchCheckChecked"  onChange={(e) => flagChangeHandle(e)}/>
											<label className="form-check-label ms-2" htmlFor="flexSwitchCheckChecked">Edit mode</label>
										</div>
										{ editFlag ? 
										<Button className="btn btn-md btn-info px-5 ms-auto me-0 d-flex"  onClick={(e) => editSubmitHandle(e)}>Edit</Button>
										: ''}
										{/* <Link className="no-link ms-auto me-0 d-flex" to={ getDataUserResult ? `/editprofile/${getDataUserResult.id}` : '/admin/profile'}>
											<Button className="btn btn-md btn-info px-5">Edit</Button>
										</Link> */}
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

export default Profile