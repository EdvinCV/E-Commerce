// Actions Types
import {
    OBTENER_MIS_PRODUCTOS, OBTENER_PRODUCTOS, SELECCIONAR_PRODUCTO, CARGANDO_PRODUCTOS, NUEVO_PRODUCTO, EDITAR_PRODUCTO, ELIMINAR_PRODUCTO
} from '../types';

const initialState = {
    productos: [],
    misProductos: [],
    selectedProduct: {},
    cargando: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CARGANDO_PRODUCTOS:
            return {
                ...state,
                cargando: true 
            }
        case OBTENER_PRODUCTOS:
            return {
                ...state,
                cargando: false,
                productos: action.payload,
            }
        case OBTENER_MIS_PRODUCTOS:
            return {
                ...state,
                cargando: false,
                misProductos: action.payload,
                selectedProduct: {}
            }
        case NUEVO_PRODUCTO:
            return {
                ...state,
                misProductos: [...state.productos, action.payload]
            }
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                selectedProduct: action.payload,
                cargando: false
            }
        case EDITAR_PRODUCTO:
            return {
                ...state,
                selectedProduct: {}
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                misProductos: state.misProductos.filter((prod) => prod.id !== action.payload)
            }
        default:
            return state;
    }
}

export default reducer;