import {combineReducers} from 'redux';
// Reducers
import authenticationReducer from './authenticationReduces';
import productosReducer from './productosReducers';
import ventasReducer from './ventasReducers';
import reportesReducer from './reportesReducers';

// Combinar reducers
export default combineReducers({
    authentication: authenticationReducer,
    productos: productosReducer,
    ventas: ventasReducer,
    reportes: reportesReducer
});