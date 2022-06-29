import { combineReducers } from "redux";
import AuthReducer from "./auth";
import AdminReducer from "./admin";
import UserReducer from "./user";


export default combineReducers({
    // disini reducers
    AuthReducer,
    AdminReducer,
    UserReducer

})