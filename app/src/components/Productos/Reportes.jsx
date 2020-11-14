import React, {useEffect} from 'react'
// React Redux
import {useDispatch, useSelector} from 'react-redux';
import { ventasPorProductoD, ventasTotal, promedio } from '../../actions/reporteActions';

const Reportes = () => {
    // Dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ventasPorProductoD());
        dispatch(ventasTotal());
        dispatch(promedio());
    });

    // useSelector
    const ventasPorProducto = useSelector((state) => state.reportes.ventasPorProducto);
    const ventasT = useSelector((state) => state.reportes.ventasTotal);
    const avg = useSelector((state) => state.reportes.promedio);

    return (
        <div className="reportes list-group">
            <h3>Reporte de Ventas</h3>
            <hr/>
            <a href="#" className="list-group-item list-group-item-action list-group-item-secondary">
                Ventas por producto (Moneda): 
                <ul>
                    {
                        ventasPorProducto.map((prod, index) => (
                            <li key={index}>{prod.producto__nombre} - Q.{prod.total_ventas}</li>
                        ))
                    }
                </ul>
            </a>
            <a href="#" className="list-group-item list-group-item-action list-group-item-primary">
                Total ventas (Moneda): 
                <ul>
                    <li>Q.{ventasT}</li>
                </ul>
            </a>
            <a href="#" className="list-group-item list-group-item-action list-group-item-secondary">
                Promedio precio mis productos: 
                <ul>
                    <li>Q.{avg}</li>
                </ul>
            </a>
        </div>
    )
}

export default Reportes;
