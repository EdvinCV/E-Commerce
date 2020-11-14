// Actions types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LOGOUT,
    GET_INFO
} from '../types';
// ACTIONS DE AUTENTICACION
import {client, clientToken} from '../config/axios';
import Swal from 'sweetalert2';

const obtenerInfoAction = (data) => ({
    type: GET_INFO,
    payload: data
});
export const obtenerInfo = () => {
    return async (dispatch) => {
        try {
            const resp = await clientToken.get('users/me');
            dispatch(obtenerInfoAction(resp.data.user));
        } catch(error){
            console.log(error);
        }
    }
}
// Registrar Usuario
export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await client.post('users/signup/', user);
            dispatch({
                type: REGISTRO_EXITOSO
            });
            Swal.fire(
                'Cuenta creada',
                resp.data + '. Puedes iniciar sesion',
                'success'
            );
        } catch(error) {
            dispatch({
                type: REGISTRO_ERROR
            });
            Swal.fire(
                'Hubo un error',
                'Nombre de tienda o email ya existen. O vuelve a intentar mas tarde.',
                'error'
            );
        }
    }
}
// Login Usuario
export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await client.post('users/login/', user);
            dispatch({
                type: LOGIN_EXITOSO,
                user: resp.data.user,
                token: resp.data.access_token
            });
        } catch(error) {
            dispatch({
                type: LOGIN_ERROR
            });
            Swal.fire(
                'Credenciales incorrectas',
                'El email o contrasena no existen.',
                'error'
            );
        }
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
    }
}