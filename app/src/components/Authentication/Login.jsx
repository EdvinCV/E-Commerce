import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
// React Router
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../actions/authenticationActions';

const Login = () => {
    // Hook dispatch
    const dispatch = useDispatch();
    // Hook history
    const history = useHistory();
    // State del form
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    // State de error
    const [error, setError] = useState(false);
    // Desestructurar valores del state
    const {email, password} = form;
     
    // Si el usuario ya esta autenticado lo redirecciona
    const authenticated = useSelector((state) => state.authentication.authenticated);
    const errorResponse = useSelector((state) => state.authentication.errorResponse);
    useEffect(() => {
        console.log(authenticated);
        if(authenticated){
            history.push('/productos');
        }
    }, [authenticated]);

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
        // Validar campos
        if(email.trim() === '' || password.trim() === ''){
            setError(true);
            setTimeout(() => setError(false), 2000);
            return;
        }
        // Dispatch
        dispatch(loginUser(form));
        // Reiniciar formulario
        setForm({
            email: '',
            password: ''
        });
        if(!errorResponse)
            history.push('/productos');
    }

    return (
        <div className="loginForm">
            <div className="card text-center">
                <div className="card-header">
                    LOGIN - VENTASGT
                </div>
                <div className="card-body">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input
                                    value={email}
                                    onChange={handleInputChange}
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
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
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Ingresar</button>
                            </div>
                        </div>

                        {
                            error &&
                                <div className="alert alert-danger" role="alert">
                                    Ingrese todos los campos
                                </div>
                        }

                        <Link to="/register" className="link">Aún no tienes una cuenta?</Link>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
