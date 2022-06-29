import { KATALOG_ALL_PRODUCT, CHECKOUT_CART, ORDER_CART, ADD_ITEM_TO_CART, GET_USER_CART, GET_USER_ORDER, PAY_ORDER, FINISH_ORDER, CANCEL_ORDER } from "../../actions/UserAction";

const initialState = {
    katalogAllProductLoading: false,
    katalogAllProductResult: false,
    katalogAllProductError: false,

    checkoutCartLoading: false,
    checkoutCartResult: false,
    checkoutCartError: false,

    orderCartLoading: false,
    orderCartResult: false,
    orderCartError: false,

    payOrderLoading: false,
    payOrderResult: false,
    payOrderError: false,

    finishOrderLoading: false,
    finishOrderResult: false,
    finishOrderError: false,

    cancelOrderLoading: false,
    cancelOrderResult: false,
    cancelOrderError: false,

    addItemToCartLoading: false,
    addItemToCartResult: false,
    addItemToCartError: false,

    getUserCartLoading: false,
    getUserCartResult: false,
    getUserCartError: false,

    getUserOrderLoading: false,
    getUserOrderResult: false,
    getUserOrderError: false,
    
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case KATALOG_ALL_PRODUCT:
            return {
                ...state,
                katalogAllProductLoading: action.payload.loading,
                katalogAllProductResult: action.payload.data,
                katalogAllProductError: action.payload.errorMessage
            }
        case CHECKOUT_CART:
            return {
                ...state,
                checkoutCartLoading: action.payload.loading,
                checkoutCartResult: action.payload.data,
                checkoutCartError: action.payload.errorMessage
            }
        case ORDER_CART:
            return {
                ...state,
                orderCartLoading: action.payload.loading,
                orderCartResult: action.payload.data,
                orderCartError: action.payload.errorMessage
            }
        case PAY_ORDER:
            return {
                ...state,
                payOrderLoading: action.payload.loading,
                payOrderResult: action.payload.data,
                payOrderError: action.payload.errorMessage
            }
        case FINISH_ORDER:
            return {
                ...state,
                finishOrderLoading: action.payload.loading,
                finishOrderResult: action.payload.data,
                finishOrderError: action.payload.errorMessage
            }
        case CANCEL_ORDER:
            return {
                ...state,
                cancelOrderLoading: action.payload.loading,
                cancelOrderResult: action.payload.data,
                cancelOrderError: action.payload.errorMessage
            }
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                addItemToCartLoading: action.payload.loading,
                addItemToCartResult: action.payload.data,
                addItemToCartError: action.payload.errorMessage
            }
        case GET_USER_CART:
            return {
                ...state,
                getUserCartLoading: action.payload.loading,
                getUserCartResult: action.payload.data,
                getUserCartError: action.payload.errorMessage
            }
        case GET_USER_ORDER:
            return {
                ...state,
                getUserOrderLoading: action.payload.loading,
                getUserOrderResult: action.payload.data,
                getUserOrderError: action.payload.errorMessage
            }
        default:
            return state;
    }
}

export default UserReducer