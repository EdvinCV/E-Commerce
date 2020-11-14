import React, {useState, Fragment} from 'react'
// React redux
import {useDispatch, useSelector} from 'react-redux';
import { AiFillDelete } from "react-icons/ai";
import FormVenta from './FormVenta';
import { eliminarProductoCarrito } from '../../actions/ventasActions';

const Carrito = () => {

    // Dispatch
    const dispatch = useDispatch();
    // Selector
    const carrito = useSelector((state) => state.ventas.carrito);    

    // Handle delete item
    const handleDeleteItem = id => {
        dispatch(eliminarProductoCarrito(id));
    }
    return (
        <div className="carrito">
            <h3>Carrito</h3>
            <hr/>
            <h4>Resumen de compra</h4>
            {carrito.length === 0 ? <p>No ha seleccionado ningun producto</p> :
                <Fragment>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Tienda</th>
                            <th scope="col">Precio Unidad</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Descuento</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        carrito.map((producto, index) => (
                            <tr key={index}>
                                <th>{index+1}</th>
                                <th>{producto.nombre}</th>
                                <th>{producto.usuario}</th>
                                <th>{producto.precio}</th>
                                <th>{producto.cantidad}</th>
                                <th>{producto.descuento}</th>
                                <th>{producto.total}</th>
                                <th><AiFillDelete onClick={() => handleDeleteItem(index)}/></th>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                <FormVenta productos={carrito} />
                </Fragment>
            }
            
        </div>
    )
}

export default Carrito
