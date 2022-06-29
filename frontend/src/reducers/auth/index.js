import { LOGIN_ACTION, LOGIN_STATUS, LOGOUT_ACTION, GET_DATA_USER, EDIT_PROFILE, UPLOAD_IMAGE } from "../../actions/AuthenticationAction";

const initialState = {
    loginActionLoading: false,
    loginActionResult: false,
    loginActionError: false,

    // getDataUserLoading: false,
    // getDataUserResult: false,
    // getDataUserError: false,

    editProfileLoading: false,
    editProfileResult: false,
    editProfileError: false,
    
    // loginStatusLoading: false,
    loginStatusResult: false,
    // loginStatusError: false
    
    // logoutActionLoading: false,
    logoutActionResult: false,
    // logoutActionError: false

    uploadImageLoading: false,
    uploadImageResult: false,
    uploadImageError: false,
    
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA_USER:
            return {
                ...state,
                getDataUserLoading: action.payload.loading,
                getDataUserResult: action.payload.data,
                getDataUserError: action.payload.errorMessage
            }
        case LOGIN_ACTION:
            return {
                ...state,
                loginActionLoading: action.payload.loading,
                loginActionResult: action.payload.data,
                loginActionError: action.payload.errorMessage
            }
            case LOGIN_STATUS:
                return {
                    ...state,
                    loginStatusResult: action.payload.data,
                }
            case LOGOUT_ACTION:
                return {
                    ...state,
                    logoutActionResult: action.payload.data,
                }
            case EDIT_PROFILE:
                return {
                    ...state,
                    editProfileLoading: action.payload.loading,
                    editProfileResult: action.payload.data,
                    editProfileError: action.payload.errorMessage
                }
            case UPLOAD_IMAGE:
                return {
                    ...state,
                    uploadImageLoading: action.payload.loading,
                    uploadImageResult: action.payload.data,
                    uploadImageError: action.payload.errorMessage
                }
        default:
            return state;
    }
}

export default AuthReducer