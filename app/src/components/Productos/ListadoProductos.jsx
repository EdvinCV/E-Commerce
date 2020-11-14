import React, {useEffect} from 'react'
import ProductCard from './ProductCard'
// React Redux
import {useDispatch, useSelector} from 'react-redux';
import { obtenerProductosGeneral } from '../../actions/productosActions';
const ListadoProductos = () => {

    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos.productos);
    const authenticated = useSelector((state) => state.authentication.authenticated);

    useEffect(() => {
        const obtenerProds = () => dispatch(obtenerProductosGeneral(authenticated));
        obtenerProds();
    }, []);

    return (
        <div className="misProductos">
            <div className="encabezaTienda">
                <h3>Listado de productos</h3>
            </div>
            <div className="listadoMisProductos">
                <br/><br/>
                <ul>
                    {   productos &&
                            productos.length === 0 ?
                                <p>No hay productos...</p> :
                            productos.map((producto) => (
                                <ProductCard key={producto.id} producto={producto} />
                            ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ListadoProductos
