import React, {useState, useEffect} from 'react'
import { seleccionarProducto, obtenerProductos, editarProducto } from '../../actions/productosActions'
// React redux
import {useDispatch, useSelector} from 'react-redux';
// History
import {useHistory} from 'react-router-dom';

const EditarProducto = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // nuevo state de producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        descuento: ''
    });
    const {nombre, descripcion, precio, descuento} = producto;
    
    const [error, setError] = useState({
        status: false,
        message: ""
    });
    useEffect(() => {
        const obtenerProducto = () => dispatch(seleccionarProducto(props.match.params.id));
        obtenerProducto();
    }, [])
    
    const productoeditar = useSelector(state => state.productos.selectedProduct);

    // llenar el state automaticamente
    useEffect( () => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre.trim() == "" || descripcion.trim() == "" || precio === 0){
            setError({
                status: true,
                message: "Debe ingresar todos los campos."
            });
            setTimeout(() => setError({
                ...error,
                status: false
            }), 2000);
            return;
        } else if(descuento >= 100){
            setError({
                status: true,
                message: "El descuento debe ser menor a 100%."
            });
            setTimeout(() => setError({
                ...error,
                status: false
            }), 2000);
            return;
        }
        dispatch(editarProducto(producto));
        dispatch(obtenerProductos());
        guardarProducto({
            nombre: '',
            descripcion: '',
            precio: '',
            descuento: ''  
        })
        history.push('/me');
    }

    const handleInputChange = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }
    
    
    return (
        <div className="createProductForm">
            <div className="card text-center">
                <div className="card-header">
                    EDITAR PRODUCTO
            </div>
            <div className="card-body">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="form-group row">
                        <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre producto</label>
                        <div className="col-sm-10">
                            <input
                                value={nombre}
                                onChange={handleInputChange}
                                name="nombre"
                                type="text" 
                                id="nombre"
                                className="form-control" 
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="descripcion" className="col-sm-2 col-form-label">Descripcion</label>
                        <div className="col-sm-10">
                            <input
                                value={descripcion}
                                onChange={handleInputChange}
                                name="descripcion"
                                id="descripcion"
                                type="text" 
                                className="form-control" 
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="precio" className="col-sm-2 col-form-label">Precio</label>
                        <div className="col-sm-10">
                            <input
                                value={precio}
                                onChange={handleInputChange}
                                name="precio"
                                id="precio"
                                type="number" 
                                className="form-control" 
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="descuento" className="col-sm-2 col-form-label">Descuento</label>
                        <div className="col-sm-10">
                            <input
                                value={descuento}
                                onChange={handleInputChange}
                                name="descuento"
                                id="descuento"
                                type="number"
                                className="form-control"
                            />
                        </div>
                    </div>
                    {
                        error.status &&
                            <div className="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                    }
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Editar producto</button>
                        </div>
                    </div>

                </form>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto;
