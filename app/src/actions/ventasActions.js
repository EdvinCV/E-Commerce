// Action types
import {
    AGREGAR_CARRITO, ELIMINAR_CARRITO, COMPRA_REALIZADA
} from '../types';
// Axios
import {client} from '../config/axios';
import Swal from 'sweetalert2';

export const agregarProductoCarrito = (producto, cantidad) => {
    return (dispatch) => {
        let total = 0;
        if(producto.descuento > 0){
            total = ((producto.precio * (1 - producto.descuento / 100)) * cantidad);
        } else {
            total = producto.precio * cantidad;
        }
        const ventaTotal = {
            ...producto,
            cantidad,
            total
        }
        dispatch({
            type: AGREGAR_CARRITO,
            payload: ventaTotal
        });
    }
}

export const eliminarProductoCarrito = (id) => {
    return (dispatch) => {
        dispatch({
            type: ELIMINAR_CARRITO,
            payload: id
        });
    }
}

export const realizarCompra = (productos, encabezado) => {
    return (dispatch) => {
        const total = productos.reduce((acumulador, value) => acumulador+value.total, 0);
        client.post('/ventas/realizarCompra/', {ventaEncabezado: {...encabezado, total}, productos})
            .then((resp) => {
                Swal.fire(
                    'Gracias por tu compra',
                    'Tu compra se ha procesado correctamente',
                    'success'
                );
                dispatch({
                    type: COMPRA_REALIZADA
                });
            })
            .catch((error) => {
                Swal.fire(
                    'Ha ocurrido un error',
                    'Tu compra no se ha podido procesar, vuelve a intentar mas tarde',
                    'success'
                );
            });
    }
}