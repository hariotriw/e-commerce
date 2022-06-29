import axios from "axios";

export const GET_DATA_USER = "GET_DATA_USER"
export const LOGIN_ACTION = "LOGIN_ACTION"
export const LOGOUT_ACTION = "LOGOUT_ACTION"
export const REGISTER_ACTION = "REGISTER_ACTION"
export const LOGIN_STATUS = "LOGIN_STATUS"
export const EDIT_PROFILE = "EDIT_PROFILE"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"

// export const getDataUser = (user) => {
export const getDataUser = () => {
    return (dispatch) => {

        // loading
        dispatch({
            type: GET_DATA_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        // console.log('get_data_user');
        const access_token = localStorage.getItem('access_token')
        // setHeader('ACCESS-TOKEN', access_token)
        // console.log(access_token);
        // get API
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/users/show/',
            timeout: 120000,
            headers: { 'access-token': access_token}
        })
            .then((response) => {
                // berhasil get API
                // console.log('berhasil dapat data');
                dispatch({
                    type: GET_DATA_USER,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                // console.log('gagal dapat data');
                // console.log(response);
                // gagal get API
                dispatch({
                    type: GET_DATA_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.errorMessage
                    }
                })
            })

    }

}

export const loginAction = (data) => {
    // console.log('masuk ke login action')
    return (dispatch) => {

        // loading
        dispatch({
            type: LOGIN_ACTION,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        // post API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/login',
            timeout: 120000,
            data: data
        })
            .then((response) => {
                // localStorage.setItem('access_token', response.data.access_token)
                // console.log('berhasil dapat data');
                localStorage.setItem('access_token', response.data)
                // console.log(response);
                
                // berhasil get API
                dispatch({
                    type: LOGIN_ACTION,
                    payload: {
                        loading: false,
                        data: true,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                let errorResponse = {
                    isError: true,
                    message: response.response.data.message
                }
                // console.log(response.response.data.message);
                // console.log('gagal dapat data');
                // gagal get API
                dispatch({
                    type: LOGIN_ACTION,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

export const registerAction = (data) => {
    // console.log('masuk ke register action')
    return (dispatch) => {

        // loading
        dispatch({
            type: REGISTER_ACTION,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        // post API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/register',
            timeout: 120000,
            data: data
        })
            .then((response) => {
                // console.log('berhasil dapat data');
                // console.log(response.data);
                // berhasil get API
                dispatch({
                    type: REGISTER_ACTION,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                // console.log(response);
                // console.log('gagal dapat data');
                // gagal get API
                dispatch({
                    type: REGISTER_ACTION,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.errorMessage
                    }
                })
            })

    }

}

export const loginStatus = () => {
    return (dispatch) => {
        const access_token = localStorage.getItem('access_token')
        let data = undefined
        if(access_token) {
            data = {
                status: true,
                access_token: access_token
            }
        } else {
            data = {
                status: false
            }
        }

        // loading
        dispatch({
            type: LOGIN_STATUS,
            payload: {
                data: data
            }
        })

        // console.log(data)
        // const access_token = localStorage.getItem('access_token')
        // if(access_token) {
        //     dispatch({
        //         type: LOGIN_STATUS,
        //         payload: {
        //             loading: false,
        //             data: access_token,
        //             errorMessage: false
        //         }
        //     })
        // } else {
        //     dispatch({
        //         type: LOGIN_STATUS,
        //         payload: {
        //             loading: false,
        //             data: false,
        //             errorMessage: true
        //         }
        //     })
        // }

    }

}
export const logoutAction = () => {
    return (dispatch) => {
        const access_token = localStorage.getItem('access_token')
        // console.log(access_token);
        let data = undefined
        if(access_token) {
            localStorage.clear()
            data = {
                logoutStatus: true,
            }
            // console.log(data);
        } else {
            data = {
                logoutStatus: false
            }
        }

        // loading
        dispatch({
            type: LOGOUT_ACTION,
            payload: {
                data: data
            }
        })
    }

}

export const editProfile = (data) => {
    // console.log('masuk ke login action')
    return (dispatch) => {
        const access_token = localStorage.getItem('access_token')

        // loading
        dispatch({
            type: EDIT_PROFILE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        // post API
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/users/update',
            timeout: 120000,
            headers: { 'access-token': access_token},
            data: data
        })
            .then((response) => {
                // localStorage.setItem('access_token', response.data.access_token)
                // console.log('berhasil dapat data');
                // console.log(response);
                
                // berhasil get API
                dispatch({
                    type: EDIT_PROFILE,
                    payload: {
                        loading: false,
                        data: true,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                let errorResponse = {
                    isError: true,
                    message: response.response.data.message
                }
                // console.log(response.response.data.message);
                // console.log('gagal dapat data');
                // gagal get API
                dispatch({
                    type: EDIT_PROFILE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: errorResponse
                    }
                })
            })

    }

}

export const uploadImage = (formData) => {
    // console.log('masuk ke post action')
    return (dispatch) => {

        // loading
        dispatch({
            type: UPLOAD_IMAGE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        // post API
        console.log(formData);
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/upload/avatar',
            timeout: 120000,
            data: formData
        })
            .then((response) => {
                console.log('berhasil upload image');
                console.log(response);
                // berhasil get API
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((response) => {
                console.log(response);
                console.log('gagal dapat data');
                // gagal get API
                dispatch({
                    type: UPLOAD_IMAGE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: response.errorMessage
                    }
                })
            })

    }

}