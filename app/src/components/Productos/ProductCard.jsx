import React from 'react';
// React redux
import {useDispatch, useSelector} from 'react-redux';
import { agregarProductoCarrito } from '../../actions/ventasActions';
import Swal from 'sweetalert2';
const ProductCard = ({producto}) => {
    // Dispatch
    const dispatch = useDispatch();

    const handleAgregarCarrito = async () => {
        const { value: cantidad } = await Swal.fire({
            input: 'number',
            inputLabel: 'Ingrese cantidad',
            inputPlaceholder: 'Cantidad '
          })
          if (cantidad) {
                Swal.fire(
                    'Agregado',
                    'El producto se ha agregado al carrito',
                    'success'
                );
              const agregarCarrito = () => dispatch(agregarProductoCarrito(producto, cantidad));
              agregarCarrito();
          }
    }
    return (
        <div className="card productCard">
            <img src="default-image.png" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Descripcion: {producto.descripcion}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Tienda: {producto.usuario}</li>
                <li className="list-group-item">Precio: Q.{producto.precio}</li>
                {
                    producto.descuento > 0 &&
                        <li className="list-group-item">{producto.descuento}</li>
                }
                
            </ul>
            <div className="card-body">
                <button
                    className="btn btn-primary"
                    onClick={handleAgregarCarrito}
                >
                    Agregar a carrito
                </button>
            </div>
        </div>
    )
}

export default ProductCard;