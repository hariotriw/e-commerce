import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus, getDataUser } from "../../../actions/AuthenticationAction";
import { adminAddProduct, adminUploadProdim } from "../../../actions/AdminAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap'

const AddProduct = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { getDataUserResult } = useSelector((state) => state.AuthReducer)
	const { adminAddProductLoading, adminAddProductResult, adminAddProductError,
		adminUploadProdimLoading, adminUploadProdimResult, adminUploadProdimError } = useSelector((state) => state.AdminReducer)

	useEffect(() => {
		dispatch(loginStatus())
		dispatch(getDataUser())
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

	// --- Init Product ---
	const [UserId, setUserId] = useState('')
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

	// ----- Start Image -----
	const fileInputOne = useRef();
	const fileInputTwo = useRef();
	const fileInputThree = useRef();
	const fileInputFour = useRef();

	const inputFileOne = () => {
        fileInputOne.current.click();
    }
	const inputFileTwo = () => {
        fileInputTwo.current.click();
    }
	const inputFileThree = () => {
        fileInputThree.current.click();
    }
	const inputFileFour = () => {
        fileInputFour.current.click();
    }

	let [imageOne, setImageOne] = useState("https://via.placeholder.com/150")
	let [saveImageOne, setSaveImageOne] = useState(null)
	let [imageTwo, setImageTwo] = useState("https://via.placeholder.com/150")
	let [saveImageTwo, setSaveImageTwo] = useState(null)
	let [imageThree, setImageThree] = useState("https://via.placeholder.com/150")
	let [saveImageThree, setSaveImageThree] = useState(null)
	let [imageFour, setImageFour] = useState("https://via.placeholder.com/150")
	let [saveImageFour, setSaveImageFour] = useState(null)

	useEffect(() => {
        console.log('use effect')
        if(adminUploadProdimResult){
            console.log('upload 1')
            if(adminUploadProdimResult.status === 200){
                console.log('upload 1.1')
                console.log(adminUploadProdimResult)
                let data = {
					dataForm: {
						name,
						desc,
						price,
						stock,
						expire,
						weight,
						category,
						brand,
						condition
					},
					resultFiles: adminUploadProdimResult.data.resultFiles,
					imageNames: adminUploadProdimResult.data.imageNames
                }
                console.log(data)
                dispatch(adminAddProduct(data))
				// handleReset()
                // setImageOne("https://via.placeholder.com/150")
                // setSaveImageOne('')
            }
        }
        // console.log(adminUploadProdimResult)
    }, [adminUploadProdimResult])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('handle submit');
        let imageData = new FormData()
        imageData.append('status', 200)
		if(saveImageOne !== null){
			imageData.append('imageOne', saveImageOne)
		}
		if(saveImageTwo !== null){
			imageData.append('imageTwo', saveImageTwo)
		}
		if(saveImageThree !== null){
			imageData.append('imageThree', saveImageThree)
		}
		if(saveImageFour !== null){
			imageData.append('imageFour', saveImageFour)
		}
		console.log(imageData)
		console.log(Object.fromEntries(imageData))
        dispatch(adminUploadProdim(imageData))
        return imageData
    }
    const handleReset = () => {
        // event.preventDefault()
		setName('')
    	setDesc('')
    	setPrice('')
    	setStock('')
    	setExpire('')
    	setWeight('')
    	setCategory('')
   		setBrand('')
    	setCondition('')
		setImageOne("https://via.placeholder.com/150")
		setImageTwo("https://via.placeholder.com/150")
		setImageThree("https://via.placeholder.com/150")
		setImageFour("https://via.placeholder.com/150")
		setSaveImageOne(null)
		setSaveImageTwo(null)
		setSaveImageThree(null)
		setSaveImageFour(null)
    }

	const handleUploadOne = ((e) => {
        console.log(e.target.files[0])
        let uploadedOne = e.target.files[0]
        setImageOne(URL.createObjectURL(uploadedOne))
        console.log(uploadedOne)
        setSaveImageOne(uploadedOne)
    })
	const handleUploadTwo = ((e) => {
        console.log(e.target.files[0])
        let uploadedTwo = e.target.files[0]
        setImageTwo(URL.createObjectURL(uploadedTwo))
		console.log(uploadedTwo)
        setSaveImageTwo(uploadedTwo)
    })
	const handleUploadThree = ((e) => {
        console.log(e.target.files[0])
        let uploadedThree = e.target.files[0]
        setImageThree(URL.createObjectURL(uploadedThree))
		console.log(uploadedThree)
        setSaveImageThree(uploadedThree)
    })
	const handleUploadFour = ((e) => {
        console.log(e.target.files[0])
        let uploadedFour = e.target.files[0]
        setImageFour(URL.createObjectURL(uploadedFour))
		console.log(uploadedFour)
        setSaveImageFour(uploadedFour)
    })

	// ----- End Images -----

	// --- Code Here ---
	// handle submit back-up
	// const handleSubmit = (event) => {
    //     event.preventDefault()
	// 	let formData = {
	// 		name, desc, price, stock, expire, weight, category, brand, condition
	// 	}
    //     console.log(formData);
    //     dispatch(adminAddProduct(formData))
    //     return formData
    // }

	

	useEffect(() => {
		console.log(adminAddProductResult);
		// console.log(loginActionError);
		if(adminAddProductResult.status === 201){
			console.log(adminAddProductResult);
			Swal.fire({  
				icon: 'success', 
				text: 'Berhasil menambahkan item'
				});  
			navigate('/admin/listproduct')
		}		
	}, [adminAddProductResult, dispatch])

	useEffect(() => {
		// console.log(loginActionResult);
		if(adminAddProductError){
			console.log(adminAddProductError);
			Swal.fire({  
				title: 'Add product is failed',
				icon: 'error', 
				text: `${adminAddProductError.message}`
				});  
		}
		
	}, [adminAddProductError, dispatch])

	return (
		<div>
			<div className="row pt-5 pb-3">
				<h3 className="page-title text-center"> Form Add Product </h3>
			</div>
			<div className="row justify-content-center pb-5">
				<div className="col-md-6 grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
							<form className="forms-sample addForm" id="addForm" onSubmit={(event) => handleSubmit(event)} enctype="multipart/form-data">
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
									<Form.Control type="date" className="form-control" id="inputExpire" name="expire" placeholder="Expire" value={expire}  onChange={(event) => setExpire(event.target.value)} required/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputWeight">Weight</label>
									<Form.Control type="number" className="form-control" id="inputWeight" name="weight" placeholder="Weight" value={weight}  onChange={(event) => setWeight(event.target.value)}/>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputCategory">Category</label>
									{/* <Form.Control type="text" className="form-control" id="inputCategory" name="category" placeholder="Category" value={category}  onChange={(event) => setCategory(event.target.value)} /> */}
									<select name="category" class="form-select " aria-label=".form-select-sm example" required value={category}  onChange={(event) => setCategory(event.target.value)}>
										<option value="" selected disabled>Masukkan kategori produk...</option>
										<option value="Console">Console</option>
										<option value="Game">Video Games</option>
										<option value="Accessories">Aksesoris</option>
										<option value="Bundle">Bundle</option>
										<option value="Other">Lainnya..</option>
									</select>
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputBrand">Brand</label>
									<Form.Control type="text" className="form-control" id="inputBrand" name="brand" placeholder="Brand" value={brand}  onChange={(event) => setBrand(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputCondition">Condition</label>
									<Form.Control type="text" className="form-control" id="inputCondition" name="condition" placeholder="Condition" value={condition}  onChange={(event) => setCondition(event.target.value)} />
								</Form.Group>
								<Form.Group className="my-3">
									<label className="mb-1" htmlFor="inputImages">Images <small style={{ color: "red" }}>*opsional (klik gambar jika ingin mengubah/menambahkan gambar produk)</small></label>
									<div className="row p-0 m-0">
										<div className="col-3 grid-margin stretch-card">
											<img src={imageOne} className="img-fluid p-0" alt="..." onClick={inputFileOne}/>
										</div>
										<div className="col-3 grid-margin stretch-card">
											<img src={imageTwo} className="img-fluid p-0" alt="..." onClick={inputFileTwo}/>
										</div>
										<div className="col-3 grid-margin stretch-card">
											<img src={imageThree} className="img-fluid p-0" alt="..." onClick={inputFileThree}/>
										</div>
										<div className="col-3 grid-margin stretch-card">
											<img src={imageFour} className="img-fluid p-0" alt="..." onClick={inputFileFour}/>
										</div>
									</div>
								</Form.Group>
								<Form.Group className="my-3">
                                    <input className="form-control" type="file" name="fileOne" id="formFileOne" accept="image/*" style={{ "display": "none" }} onChange={(event) => handleUploadOne(event)} ref={fileInputOne} />
                                    <input className="form-control" type="file" name="fileTwo" id="formFileTwo" accept="image/*" style={{ "display": "none" }} onChange={(event) => handleUploadTwo(event)} ref={fileInputTwo} />
                                    <input className="form-control" type="file" name="fileThree" id="formFileThree" accept="image/*" style={{ "display": "none" }} onChange={(event) => handleUploadThree(event)} ref={fileInputThree} />
                                    <input className="form-control" type="file" name="fileFour" id="formFileFour" accept="image/*" style={{ "display": "none" }} onChange={(event) => handleUploadFour(event)} ref={fileInputFour} />
								</Form.Group>
								
								<div className="my-3 d-flex">

									<button type="button" className="btn btn-secondary ms-auto me-2 d-flex" onClick={(event) => handleReset(event)}>Reset</button>
									<button type="submit" className="btn btn-primary ms-0 me-2 d-flex">Submit</button>
								{/* <button className="btn btn-light">Cancel</button> */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddProduct