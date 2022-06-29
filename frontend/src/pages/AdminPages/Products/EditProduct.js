import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../../actions/AuthenticationAction";
import { adminGetProduct, adminEditProduct } from "../../../actions/AdminAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap'

const EditProduct = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	let { id } = useParams();

	const { getDataUserResult } = useSelector((state) => state.AuthReducer)
	const { adminGetProductLoading, adminGetProductResult, adminGetProductError,
		adminEditProductLoading, adminEditProductResult, adminEditProductError } = useSelector((state) => state.AdminReducer)

	useEffect(() => {
		dispatch(adminGetProduct(id))
		dispatch(loginStatus())
		dispatch(getDataUser())
	}, [dispatch])

	useEffect(() => {
		setName(adminGetProductResult.name)
		setDesc(adminGetProductResult.desc)
		setPrice(adminGetProductResult.price)
		setStock(adminGetProductResult.stock)
		adminGetProductResult ? setExpire(adminGetProductResult.expire.slice(0, 10)) : setExpire('')
		setWeight(adminGetProductResult.weight)
		setCategory(adminGetProductResult.category)
		setBrand(adminGetProductResult.brand)
		setCondition(adminGetProductResult.condition)
	}, [adminGetProductResult])

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

	
	// --- Init Product ---
	const [UserId, setUserId] = useState('')
    let [idi, setIdi] = useState(id)
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [price, setPrice] = useState('')
    let [stock, setStock] = useState('')
    let [expire, setExpire] = useState('')
    let [weight, setWeight] = useState('')
    let [category, setCategory] = useState('')
    let [brand, setBrand] = useState('')
    let [condition, setCondition] = useState('')
    let [totalSold, setTotalSold] = useState('')
    let [rating, setRating] = useState('')
    let [views, setViews] = useState('')

	// --- Code Here ---
	const handleSubmit = (event) => {
        event.preventDefault()
		// var formElement = document.querySelector("addForm");
        // console.log(formElement);
        // console.log('handle submit');
		let formData = {
			id, name, desc, price, stock, expire, weight, category, brand, condition
		}
        // console.log(formData);
        dispatch(adminEditProduct(formData))
    }

	// const handleUploadChange = ((e) => {
    //     console.log(e.target.files)
    //     let uploaded = e.target.files
    //     // setImage(URL.createObjectURL(uploaded))
    //     // setSaveImage(uploaded)
    // })

	// console.log(adminEditProductResult);
	useEffect(() => {
		console.log(adminEditProductResult);
		// console.log(loginActionError);
		if(adminEditProductResult.status === 201){
			console.log(adminEditProductResult);
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil menambahkan item'
				});  
			// window.location.reload()
			// karena sering error redirect setelah edit product, harus di refresh page dulu
			navigate('/admin/listproduct')
		}		
	}, [adminEditProductResult, dispatch])

	useEffect(() => {
		// console.log(loginActionResult);
		if(adminEditProductError){
			// console.log(adminEditProductError);
			Swal.fire({  
				title: 'Add product is failed',
				icon: 'error', 
				text: `${adminEditProductError.message}`
				});  
		}
		
	}, [adminEditProductError, dispatch])

	return (
		<div>
			<div className="row pt-5 pb-3">
				<h3 className="page-title text-center"> Form Edit Product </h3>
			</div>
			<div className="row justify-content-center pb-5">
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<form className="forms-sample addForm" id="addForm" onSubmit={(event) => handleSubmit(event)}>
								{/* <Form.Control type="hidden" id="inputProductName" name="UserId" value="1" placeholder="Product Name" hidden/> */}
								{/* <Form.Control type="hidden" id="inputProductName" name="UserId" value="1" placeholder="Product Name" hidden/> */}
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputProductName">Product Name <small style={{ color: "red" }}>*wajib diisi</small></label>
									<Form.Control type="text" id="inputProductName" name="name" placeholder="Product Name" value={name}  onChange={(event) => setName(event.target.value)} required/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputDescription">Description <small style={{ color: "red" }}>*wajib diisi</small></label>
									<Form.Control type="text" className="form-control" id="inputDescription" name="desc" placeholder="Description" value={desc}  onChange={(event) => setDesc(event.target.value)} required/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputPrice">Price <small style={{ color: "red" }}>*wajib diisi</small></label>
									<Form.Control type="number" className="form-control" id="inputPrice" name="price" placeholder="Price" value={price}  onChange={(event) => setPrice(event.target.value)} required/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputStock">Stock <small style={{ color: "red" }}>*wajib diisi</small></label>
									<Form.Control type="number" className="form-control" id="inputStock" name="stock" placeholder="Stock" value={stock}  onChange={(event) => setStock(event.target.value)} required/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputExpire">Expire</label>
									<Form.Control type="date" className="form-control" id="inputExpire" name="expire" placeholder="Expire" value={expire}  onChange={(event) => setExpire(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputWeight">Weight</label>
									<Form.Control type="number" className="form-control" id="inputWeight" name="weight" placeholder="Weight" value={weight}  onChange={(event) => setWeight(event.target.value)}/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputCategory">Category</label>
									<Form.Control type="text" className="form-control" id="inputCategory" name="category" placeholder="Category" value={category}  onChange={(event) => setCategory(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputBrand">Brand</label>
									<Form.Control type="text" className="form-control" id="inputBrand" name="brand" placeholder="Brand" value={brand}  onChange={(event) => setBrand(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputCondition">Condition</label>
									<Form.Control type="text" className="form-control" id="inputCondition" name="condition" placeholder="Condition" value={condition}  onChange={(event) => setCondition(event.target.value)} />
								</Form.Group>
								{/* <Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputTotalSold">Total Sold</label>
									<Form.Control type="number" className="form-control" id="inputTotalSold" name="totalSold" placeholder="Total Sold" value={totalSold}  onChange={(event) => setTotalSold(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputRating">Rating</label>
									<Form.Control type="number" className="form-control" id="inputRating" name="rating" placeholder="Rating" value={rating}  onChange={(event) => setRating(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputViews">Views</label>
									<Form.Control type="number" className="form-control" id="inputViews" name="views" placeholder="Views" value={views}  onChange={(event) => setViews(event.target.value)} />
								</Form.Group> */}
								{/* <Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputViews">Image Sample</label>
									<Form.Control type="file" accept="image/*" className="form-control" id="images" name="images[]" placeholder="Views"  multiple onChange={(event) => handleUploadChange(event)}/>
								</Form.Group> */}
								<button type="submit" className="btn btn-primary ms-auto me-2 d-flex">Submit</button>
								{/* <button className="btn btn-light">Cancel</button> */}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProduct