// Action types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LOGOUT,
    GET_INFO
} from '../types';
// Estado inicial
const initialState = {
    access_token: localStorage.getItem("access_token"),
    authenticated: localStorage.getItem("access_token") ? true : false,
    user: "",
    loading: true,
    errorResponse: false
}

// Funcion reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INFO:
            return {
                ...state,
                user: action.payload
            }
        case REGISTRO_EXITOSO:
            return {
                ...state,
                errorResponse: false
            }
        case REGISTRO_ERROR:
            return {
                ...state,
                errorResponse: true
            }
        case LOGIN_EXITOSO:
            localStorage.setItem("access_token", action.token);
            return {
                ...state,
                access_token: action.token,
                authenticated: true,
                user: action.user,
                errorResponse: false
            }
        case LOGIN_ERROR:
            localStorage.removeItem("access_token");
            return {
                ...state,
                errorResponse: true
            }
        case LOGOUT:
            localStorage.removeItem("access_token");
            return {
                ...state,
                user: "",
                authenticated: false,
                access_token: null
            }
        default:
            return state;
    }
}

export default reducer;