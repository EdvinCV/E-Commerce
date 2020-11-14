import React from 'react'
// React Redux
import {useDispatch, useSelector} from 'react-redux';
// React Router
import { Link, useHistory } from 'react-router-dom';
// Actions
import { userLogout } from '../../actions/authenticationActions';
import { obtenerProductos } from '../../actions/productosActions';
// Icons
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    // History
    const history = useHistory();
    // Dispatch
    const dispatch = useDispatch();
    // Identificar si usuario esta logueado
    const authenticated = useSelector(state => state.authentication.authenticated)

    // Manejar logout
    const handleLogout = e => {
        e.preventDefault();
        dispatch(userLogout());
    }

    const handleRedirectCarrito = () => {
        history.push('/carrito');
    }

    const cantidadCarrito = useSelector((state) => state.ventas.carrito);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">VENTASGT</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {authenticated ?
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/me" className="nav-link">Mis Productos</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/reportes" className="nav-link">Reportes</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/productos" className="nav-link">Busca Productos</Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" onClick={handleLogout}>Cerrar Sesion <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                :
                <ul className="navbar-nav mr-5">
                    <li className="nav-item active">
                        <Link to="/productos" className="nav-link">Busca Productos</Link>
                    </li>
                    <li className="nav-item active">
                    <Link to="/login" className="nav-link">Ingresar</Link>
                    </li>
                </ul>
            }
            <FaShoppingCart 
                onClick={handleRedirectCarrito}
            />{cantidadCarrito.length} articulos
            </div>
            
        </nav>
    )
}

export default Navbar
