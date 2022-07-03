import axios from "axios";

export const ADMIN_GET_ALL_PRODUCT = "ADMIN_GET_ALL_PRODUCT"
export const ADMIN_ADD_PRODUCT = "ADMIN_ADD_PRODUCT"
export const ADMIN_UPLOAD_PRODIM = "ADMIN_UPLOAD_PRODIM"
export const ADMIN_EDIT_PRODUCT = "ADMIN_EDIT_PRODUCT"
export const ADMIN_GET_PRODUCT = "ADMIN_GET_PRODUCT"
export const ADMIN_GET_ALL_ORDER = "ADMIN_GET_ALL_ORDER"
export const ADMIN_CONFIRM_ORDER = "ADMIN_CONFIRM_ORDER"

// export const getDataUser = (user) => {
export const adminGetAllProduct = () => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_GET_ALL_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')

        // get API
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/admins/products/lists',
            timeout: 120000,
            headers: { 'access-token': access_token}
        })
            .then((response) => {
                // berhasil get API
                console.log('berhasil dapat data');
                dispatch({
                    type: ADMIN_GET_ALL_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log('gagal dapat data');
                console.log(response);
                // gagal get API
                dispatch({
                    type: ADMIN_GET_ALL_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.response.data.message
                    }
                })
            })

    }

}

// export const getDataUser = (user) => {
export const adminAddProduct = (formData) => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_ADD_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')
        console.log(formData);
        // get API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/admins/products/create',
            timeout: 120000,
            headers: { 'access-token': access_token},
            data: formData
        })
            .then((response) => {
                // berhasil get API
                console.log('berhasil menambah data');
                dispatch({
                    type: ADMIN_ADD_PRODUCT,
                    payload: {
                        loading: false,
                        data: response,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log('gagal menambah data');
                console.log(response);
                let errorResponse = {
                    isError: true,
                    status: response.response.status,
                    message: response.response.data
                }
                // gagal get API
                dispatch({
                    type: ADMIN_ADD_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

// adminUploadProdim => admin upload product image
export const adminUploadProdim = (formData) => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_UPLOAD_PRODIM,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')
        console.log(formData);
        // get API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/upload/prodimg',
            timeout: 120000,
            headers: { 'access-token': access_token},
            data: formData
        })
            .then((response) => {
                // berhasil get API
                console.log('berhasil menambah data');
                dispatch({
                    type: ADMIN_UPLOAD_PRODIM,
                    payload: {
                        loading: false,
                        data: response,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log('gagal menambah data');
                console.log(response);
                let errorResponse = {
                    isError: true,
                    status: response.response.status,
                    message: response.response.data
                }
                // gagal get API
                dispatch({
                    type: ADMIN_UPLOAD_PRODIM,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

// export const getDataUser = (user) => {
export const adminEditProduct = (formData) => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_EDIT_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')
        // console.log(formData);
        // get API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/admins/products/update',
            timeout: 120000,
            headers: { 'access-token': access_token},
            data: formData
        })
            .then((response) => {
                // berhasil get API
                // console.log('berhasil mengubah data');
                dispatch({
                    type: ADMIN_EDIT_PRODUCT,
                    payload: {
                        loading: false,
                        data: response,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                // console.log('gagal mengubah data');
                // console.log(response);
                let errorResponse = {
                    isError: true,
                    status: response.response.status,
                    message: response.response.data
                }
                // gagal get API
                dispatch({
                    type: ADMIN_EDIT_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

// export const getDataUser = (user) => {
export const adminGetProduct = (id) => {
    return (dispatch) => {
        // /products/edit/:id
        // loading
        dispatch({
            type: ADMIN_GET_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')
        // get API
        axios({
            method: 'GET',
            url: `http://localhost:3001/api/admins/products/edit/${id}`,
            timeout: 120000,
            headers: { 'access-token': access_token},
        })
            .then((response) => {
                // berhasil get API
                // console.log(response.data);
                // console.log('berhasil mengambil data');
                dispatch({
                    type: ADMIN_GET_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                // console.log('gagal mengubah data');
                // console.log(response);
                let errorResponse = {
                    isError: true,
                    status: response.response.status,
                    message: response.response.data
                }
                // gagal get API
                dispatch({
                    type: ADMIN_GET_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

// export const getDataUser = (user) => {
export const adminGetAllOrder = () => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_GET_ALL_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')

        // get API
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/admins/orders/lists',
            timeout: 120000,
            headers: { 'access-token': access_token}
        })
            .then((response) => {
                // berhasil get API
                console.log('berhasil dapat data');
                dispatch({
                    type: ADMIN_GET_ALL_ORDER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log('gagal dapat data');
                console.log(response);
                // gagal get API
                dispatch({
                    type: ADMIN_GET_ALL_ORDER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.response.data.message
                    }
                })
            })

    }

}

// export const getDataUser = (user) => {
export const adminConfirmOrder = (data) => {
    return (dispatch) => {

        // loading
        dispatch({
            type: ADMIN_CONFIRM_ORDER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })
        const access_token = localStorage.getItem('access_token')

        // get API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/admins/orders/confirmOrder',
            timeout: 120000,
            headers: { 'access-token': access_token},
            data: data
        })
            .then((response) => {
                // berhasil get API
                console.log('berhasil mengkonfirmasi pesanan');
                dispatch({
                    type: ADMIN_CONFIRM_ORDER,
                    payload: {
                        loading: false,
                        data: true,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log('gagal mengkonfirmasi pesanan');
                console.log(response);
                // gagal get API
                dispatch({
                    type: ADMIN_CONFIRM_ORDER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.response.data.message
                    }
                })
            })

    }

}
