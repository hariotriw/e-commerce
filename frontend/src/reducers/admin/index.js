import { ADMIN_GET_ALL_PRODUCT,  ADMIN_GET_ALL_ORDER, ADMIN_ADD_PRODUCT, ADMIN_EDIT_PRODUCT, ADMIN_GET_PRODUCT, ADMIN_CONFIRM_ORDER, ADMIN_UPLOAD_PRODIM } from "../../actions/AdminAction";

const initialState = {
    adminGetAllProductLoading: false,
    adminGetAllProductResult: false,
    adminGetAllProductError: false,
    
    adminAddProductLoading: false,
    adminAddProductResult: false,
    adminAddProductError: false,

    adminGetProductLoading: false,
    adminGetProductResult: false,
    adminGetProductError: false,

    adminEditProductLoading: false,
    adminEditProductResult: false,
    adminEditProductError: false,
    
    adminGetAllOrderLoading: false,
    adminGetAllOrderResult: false,
    adminGetAllOrderError: false,
    
    adminConfirmLoading: false,
    adminConfirmResult: false,
    adminConfirmError: false,
    
    adminUploadProdimLoading: false,
    adminUploadProdimResult: false,
    adminUploadProdimError: false,
    
}

const AdminReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADMIN_GET_ALL_PRODUCT:
            return {
                ...state,
                adminGetAllProductLoading: action.payload.loading,
                adminGetAllProductResult: action.payload.data,
                adminGetAllProductError: action.payload.errorMessage
            }
        case ADMIN_ADD_PRODUCT:
            return {
                ...state,
                adminAddProductLoading: action.payload.loading,
                adminAddProductResult: action.payload.data,
                adminAddProductError: action.payload.errorMessage
            }
        case ADMIN_EDIT_PRODUCT:
            return {
                ...state,
                adminEditProductLoading: action.payload.loading,
                adminEditProductResult: action.payload.data,
                adminEditProductError: action.payload.errorMessage
            }
        case ADMIN_GET_PRODUCT:
            return {
                ...state,
                adminGetProductLoading: action.payload.loading,
                adminGetProductResult: action.payload.data,
                adminGetProductError: action.payload.errorMessage
            }
        case ADMIN_GET_ALL_ORDER:
            return {
                ...state,
                adminGetAllOrderLoading: action.payload.loading,
                adminGetAllOrderResult: action.payload.data,
                adminGetAllOrderError: action.payload.errorMessage
            }
        case ADMIN_CONFIRM_ORDER:
            return {
                ...state,
                adminConfirmOrderLoading: action.payload.loading,
                adminConfirmOrderResult: action.payload.data,
                adminConfirmOrderError: action.payload.errorMessage
            }
        case ADMIN_UPLOAD_PRODIM:
            return {
                ...state,
                adminUploadProdimLoading: action.payload.loading,
                adminUploadProdimResult: action.payload.data,
                adminUploadProdimError: action.payload.errorMessage
            }
        default:
            return state;
    }
}

export default AdminReducer