import React, {useState} from 'react';
// React Redux
import {useDispatch, useSelector} from 'react-redux';
// Actions
import {crearProducto} from '../../actions/productosActions';
import { obtenerProductos } from '../../actions/productosActions';

const CrearProducto = ({history}) => {
    // STORE
    const dispatch = useDispatch();
    // State del form
    const [error, setError] = useState({
        status: false,
        message: ""
    });
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        descuento: 0 
    });
    // Extraer valores del form
    const {nombre, descripcion, precio, descuento} = form;

    // Handle input change
    const handleInputChange = e => {
        // Controlar enteros en descuento
        if(e.target.name == 'descuento'){
            if(e.target.value != "")
                if(e.target.value < 0){
                    e.target.value = 0;
                } else 
                    e.target.value = parseInt(e.target.value);
            else
                e.target.value = 0
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    // Handle Submit
    const handleSubmit = e => {
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
        dispatch(crearProducto(form));
        dispatch(obtenerProductos());
        history.push('/me');
    }

    return (
        <div className="createProductForm">
            <div className="card text-center">
                <div className="card-header">
                    CREAR NUEVO PRODUCTO
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
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Crear producto</button>
                        </div>
                    </div>

                    {
                        error.status &&
                            <div className="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                    }
                </form>
            </div>
        </div>
    </div>
    )
}

export default CrearProducto
