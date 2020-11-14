// Actions types
import {
    NUEVO_PRODUCTO,
    NUEVO_PRODUCTO_ERROR,
    OBTENER_MIS_PRODUCTOS,
    OBTENER_MIS_PRODUCTOS_ERROR,
    OBTENER_PRODUCTOS,
    SELECCIONAR_PRODUCTO,
    CARGANDO_PRODUCTOS,
    EDITAR_PRODUCTO,
    ELIMINAR_PRODUCTO
} from '../types';
import {clientToken, client} from '../config/axios';
import Swal from 'sweetalert2';


// Registrar Usuario
export const crearProducto = (producto) => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.post('/productos/', producto);
            dispatch({
                type: NUEVO_PRODUCTO,
                payload: resp.data
            });
            Swal.fire(
                'Producto agregado',
                'Has creado el producto existosamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch({
                type: NUEVO_PRODUCTO_ERROR
            });
            Swal.fire(
                'Ha occurido un error.',
                'Vuelve a intentar.',
                'error'
            );
        }
    }
}

const obtenerProductosAction = (data) => ({
    type: OBTENER_MIS_PRODUCTOS,
    payload: data
});

export const obtenerProductos = () => {
    return (dispatch) => {
        clientToken.get('/productos/tienda')
            .then((resp) => dispatch(obtenerProductosAction(resp.data.productos)))
            .catch((error) => console.log(error));  
    }
}

const obtenerProductosGeneralAction = (data) => ({
    type: OBTENER_PRODUCTOS,
    payload: data
});
export const obtenerProductosGeneral = (authenticated) => {
    return (dispatch) => {
        if(authenticated){
            clientToken.get('/productos/general')
                .then((resp) => dispatch(obtenerProductosGeneralAction(resp.data.productos)))
                .catch((error) => console.log(error));
        } else {
            client.get('/productos/general')
                .then((resp) => dispatch(obtenerProductosGeneralAction(resp.data.productos)))
                .catch((error) => console.log(error));
        }
    }
}

const seleccionarProductoAction = (data) => ({
    type: SELECCIONAR_PRODUCTO,
    payload: data
});

export const seleccionarProducto = (id) => {
        return (dispatch) => {
            clientToken.get(`/productos/${id}`)
                .then((resp) => dispatch(seleccionarProductoAction(resp.data)))
                .catch((error) => console.log(error));
    }
}

const editarProductoAction = () => ({
    type: EDITAR_PRODUCTO
});

export const editarProducto = (producto) => {
    return (dispatch) => {
        clientToken.put(`/productos/${producto.id}/`, producto)
            .then((resp) => {
                dispatch(editarProductoAction());
                Swal.fire(
                    'Producto actualizado',
                    'La informacion de tu producto se ha actualizado correctamente',
                    'success'
                );
            })
            .catch((error) => {
                console.log(error);
                Swal.fire(
                    'Ha ocurrido un error',
                    'No se ha podido actualizar tu producto, vuelve a intentarlo mas tarde.',
                    'error'
                );
            });
    }
}

const eliminarProductoAction = (id) => ({
    type: ELIMINAR_PRODUCTO,
    payload: id
});

export const eliminarProducto = (id) => {
    return (dispatch) => {
        clientToken.delete(`/productos/${id}`)
            .then((resp) => {
                dispatch(eliminarProductoAction(id));
                Swal.fire(
                    'Producto eliminado',
                    'Su producto se ha eliminado correctamente',
                    'success'
                );
            })
            .catch((error) => console.log(error));
    }
}