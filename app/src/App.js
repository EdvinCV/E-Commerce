import React from 'react'
// React Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Components
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import ListadoProductos from './components/Productos/ListadoProductos';
import CrearProducto from './components/Productos/CrearProducto';
import Navbar from './components/Layout/Navbar';
// Proveer el store
import {Provider} from 'react-redux';
// Store configurado
import store from './store';
import MisProductos from './components/Productos/MisProductos';
import EditarProducto from './components/Productos/EditarProducto';
import Carrito from './components/Ventas/Carrito';
import VerificationAuth from './components/Authentication/VerificationAuth';
import Reportes from './components/Productos/Reportes';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/productos" component={ListadoProductos} />
            <Route exact path="/carrito" component={Carrito} />
            <VerificationAuth>
              <Route exact path="/productos/new" component={CrearProducto} />
              <Route exact path="/me" component={MisProductos} />
              <Route exact path="/me/editProduct/:id" component={EditarProducto} />
              <Route exact path="/reportes" component={Reportes} />
            </VerificationAuth>
          </Switch>
      </Provider>
    </Router>
  );
}

export default App;
