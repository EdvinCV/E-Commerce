import { AGREGAR_CARRITO, ELIMINAR_CARRITO, COMPRA_REALIZADA, COMPRA_ERROR } from "../types";

const initialState = {
    carrito: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AGREGAR_CARRITO:
            return {
                ...state,
                carrito: [...state.carrito, action.payload]
            }
        case ELIMINAR_CARRITO:
            return {
                ...state,
                carrito: state.carrito.filter((prod, index) => index !== action.payload)
            }
        case COMPRA_REALIZADA:
            return {
                ...state,
                carrito: []
            }
        case COMPRA_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;