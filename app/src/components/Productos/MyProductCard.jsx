import React, {useEffect} from 'react';
// React Router
import { Link, useHistory} from 'react-router-dom';
// React Redux
import {useDispatch, useSelector} from 'react-redux';
import { seleccionarProducto, eliminarProducto, obtenerProductos } from '../../actions/productosActions';

const MyProductCard = ({producto}) => {

    const {id, nombre, descripcion, precio, descuento} = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    // Handle redireccinar a edicion
    const handleRedirectEdit = () => {
        history.push(`/me/editProduct/${id}`);
    }

    // Handle delete product
    const handleDeleteProducto = () => {
        const deleteProd = () => dispatch(eliminarProducto(id));
        deleteProd();
        dispatch(obtenerProductos());
    }

    return (
        <div className="card productCard">
            <img src="default-image.png" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Nombre: {nombre}</h5>
                <p className="card-text">Descripcion: {descripcion}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Precio: Q.{precio}</li>
                <li className="list-group-item">Descuento: {descuento}%</li>
            </ul>
            <div className="card-body">
                <button
                    className="btn btn-secondary"
                    onClick={handleRedirectEdit}
                >
                    Editar producto
                </button>
                <br/><br/>
                <button
                    className="btn btn-danger"
                    onClick={handleDeleteProducto}
                >
                    Eliminar producto
                </button>
            </div>
        </div>
    )
}

export default MyProductCard;