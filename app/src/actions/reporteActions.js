

import {clientToken} from '../config/axios';
import { VENTAS_POR_PRODUCTO, VENTAS_TOTAL, PROMEDIO_PRODUCTOS } from '../types';

export const ventasPorProductoD = () => {
    return (dispatch) => {
        clientToken.get('ventas/ventasPorProducto')
            .then((resp) => {
                console.log(resp.data);
                dispatch({
                    type: VENTAS_POR_PRODUCTO,
                    payload: resp.data
                });
            })
            .catch((error) => console.log(error));
    }
}

export const ventasTotal = () => {
    return (dispatch) => {
        clientToken.get('ventas/ventasTotal')
            .then((resp) => {
                console.log(resp.data);
                dispatch({
                    type: VENTAS_TOTAL,
                    payload: resp.data.subTotal__sum
                });
            })
            .catch((error) => console.log(error));
    }
}

export const promedio = () => {
    return (dispatch) => {
        clientToken.get('ventas/promedioProductos')
            .then((resp) => {
                dispatch({
                    type: PROMEDIO_PRODUCTOS,
                    payload: resp.data.precio__avg
                });
            })
            .catch((error) => console.log(error));
    }
}