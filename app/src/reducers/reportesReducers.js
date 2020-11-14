import { VENTAS_POR_PRODUCTO, VENTAS_TOTAL, PROMEDIO_PRODUCTOS } from "../types"

const initialState = {
    ventasPorProducto: [],
    ventasTotal: 0,
    promedioProductos: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case VENTAS_POR_PRODUCTO:
            return {
                ...state,
                ventasPorProducto: action.payload
            }
        case VENTAS_TOTAL: {
            return {
                ...state,
                ventasTotal: action.payload
            }
        }
        case PROMEDIO_PRODUCTOS:
            return {
                ...state,
                promedio: action.payload
            }
        default:
            return state;
    }
}

export default reducer;