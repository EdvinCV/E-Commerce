import React, {useState} from 'react'
// React redux
import {useDispatch} from 'react-redux';
import { realizarCompra } from '../../actions/ventasActions';
// History
import {useHistory} from 'react-router-dom';
const FormVenta = ({productos}) => {
        const history = useHistory();
        // Dispatch
        const dispatch = useDispatch();
        // Error
        const [error, setError] = useState({
            status: false,
            message: ''
        });
        // Form
        const [form, setForm] = useState({
            nombreFactura: '',
            nit: '',
            telefono: ''
        });
        // Handle change
        const handleInputChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
        // Handle submit
        const handleSubmit = (e) => {
            e.preventDefault();
            if(nombreFactura.trim() === "" || nit.trim() === "" || telefono.trim() === ""){
                setError({
                    status: true,
                    message: "Debe ingresar todos los campos"
                });
                setTimeout(() => {
                    setError({
                        message: "",
                        status: false
                    });
                }, 2000);
                return;
            }
            dispatch(realizarCompra(productos, form));
            history.push('/productos');

        }
    const {nombreFactura, nit, telefono} = form;
    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="form-group row">
                <label htmlFor="nombreFactura" className="col-sm-2 col-form-label">Nombre Factura</label>
                <div className="col-sm-10">
                    <input
                        value={nombreFactura}
                        onChange={handleInputChange}
                        name="nombreFactura"
                        type="text"
                        id="nombreFactura"
                        className="form-control" 
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="nit" className="col-sm-2 col-form-label">NIT</label>
                <div className="col-sm-10">
                    <input
                        value={nit}
                        onChange={handleInputChange}
                        name="nit"
                        id="text"
                        type="nit"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="telefono" className="col-sm-2 col-form-label">Telefono</label>
                <div className="col-sm-10">
                    <input
                        value={telefono}
                        onChange={handleInputChange}
                        name="telefono"
                        id="telefono"
                        type="telefono"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Finalizar compra</button>
                </div>
            </div>

            {
                error.status &&
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>
            }
        </form>
    )
}

export default FormVenta
