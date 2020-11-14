import React, { useEffect } from 'react'
// Components
import MyProductCard from './MyProductCard';
import { Link } from 'react-router-dom';
// React Redux
import {useDispatch, useSelector} from 'react-redux';
import { obtenerProductos } from '../../actions/productosActions';
import { obtenerInfo } from '../../actions/authenticationActions';


const MisProductos = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(obtenerProductos());
        dispatch(obtenerInfo());
    }, []);

    const misProductos = useSelector((state) => state.productos.misProductos);
    const user = useSelector((state) => state.authentication.user);

    return (
        <div className="misProductos">
            <div className="encabezaTienda">
                <h2>Empresa - {user.username}</h2>
                <h4>{user.first_name} {user.last_name}</h4>
            </div>
            <div className="listadoMisProductos">
                <Link to="/productos/new" className="btn btn-primary">Crear Producto</Link>
                <br/><br/>
                <h4>Tus productos</h4>
                <ul>
                    {   misProductos &&
                            misProductos.length === 0 ?
                                <p>No hay productos...</p> :
                            misProductos.map((producto) => (
                                <MyProductCard key={producto.id} producto={producto} />
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default MisProductos
