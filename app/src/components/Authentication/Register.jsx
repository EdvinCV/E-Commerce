import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../../actions/authenticationActions';

const Register = ({history}) => {
    // Utilizar dispatch
    const dispatch = useDispatch();

    // Si el usuario ya esta autenticado lo redirecciona
    const authenticated = useSelector((state) => state.authentication.authenticated);
    useEffect(() => {
        console.log(authenticated);
        if(authenticated){
            history.push('/productos');
        }
        }, [authenticated]);

    const errorResponse = useSelector((state) => state.authentication.error);
    // State del form
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    });
    // State de error
    const [error, setError] = useState({
        status: false,
        message: ""
    });
    // Desestructurar valores del state
    const {first_name, last_name, email, username, password, confirm_password} = form;

    // Manejar los cambios en los inputs
    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // Manejar submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones del formulario
        if(email.trim() === '' || first_name.trim() === '' || last_name.trim() === '' || username.trim() === '' || password.trim() === '' || confirm_password.trim() === '' ){
            setError({
                message: "Ingrese todos los campos",
                status: true
            });
            setTimeout(() => setError({
                ...error,
                status: false
            }), 2000);
            return;
        // Si las contrasenas no coinciden se muestra mensaje
        } else if(password !== confirm_password){
            setError({
                message: "Las contrasenas no coinciden",
                status: true
            });
            // Luego de dos segundos se borrar el error
            setTimeout(() => setError({
                ...error,
                status: false
            }), 2000);
            return;
        }
        // Llamar al action del store
        dispatch(registerUser(form));
        // Reiniciar valores del form
        setForm({first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            confirm_password: ''
        });
        // Si no hay error redireccionar a login
        if(!errorResponse){
            history.push('/login');
        }
    }

    return (
        <div className="loginForm">
            <div className="card text-center">
                <div className="card-header">
                    REGISTRO - VENTASGT
                </div>
                <div className="card-body">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group row">
                            <label htmlFor="first_name" className="col-sm-2 col-form-label">Nombre</label>
                            <div className="col-sm-10">
                                <input
                                    value={first_name}
                                    onChange={handleInputChange}
                                    name="first_name"
                                    type="text" 
                                    id="first_name"
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="last_name" className="col-sm-2 col-form-label">Apellido</label>
                            <div className="col-sm-10">
                                <input
                                    value={last_name}
                                    onChange={handleInputChange}
                                    name="last_name"
                                    id="last_name"
                                    type="text" 
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Correo</label>
                            <div className="col-sm-10">
                                <input
                                    value={email}
                                    onChange={handleInputChange}
                                    name="email"
                                    id="email"
                                    type="email" 
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">Tienda</label>
                            <div className="col-sm-10">
                                <input
                                    value={username}
                                    onChange={handleInputChange}
                                    name="username"
                                    id="username"
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Contrasena</label>
                            <div className="col-sm-10">
                                <input
                                    value={password}
                                    onChange={handleInputChange}
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="confirm_password" className="col-sm-2 col-form-label">Confirmar contrasena</label>
                            <div className="col-sm-10">
                                <input
                                    value={confirm_password}
                                    onChange={handleInputChange}
                                    name="confirm_password"
                                    id="confirm_password"
                                    type="password" 
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Registrarse</button>
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

export default Register;
