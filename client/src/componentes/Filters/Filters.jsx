import React, { useEffect } from 'react'
import style from './Filters.module.css';
import { filtrarPorDieta, getDietas, getRecetas, ordenarNivelComida, ordenarNombre, filtrarPorOrigen } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Filters = () => {

    const dispatch = useDispatch()

    const handleOrdenNombre = (event) => {
        dispatch(ordenarNombre(event.target.value));
    };

    const handleOrdenNivel = (event) => {
        dispatch(ordenarNivelComida(event.target.value));
    };

    const handleFiltrarDieta = (event) => {
        const payload = event.target.value
        if (payload === 'All') {
            dispatch(getRecetas())
        } else {
            dispatch(filtrarPorDieta(payload));
        }

    };

    const handleFiltrarOrigen = (event) => {
        const payload = event.target.value
        if (payload === 'All') {
            dispatch(getRecetas())
        } else {
            dispatch(filtrarPorOrigen(payload));
        }

    };

    useEffect(() => {
        dispatch(getDietas())
    }, [getDietas])

    const dietas = useSelector(state => state.dietas)

    return (
        <div>
            <select className={style.select} name="orderAZ" onChange={handleOrdenNombre}>
                <option value=''>Order by Name</option>
                <option value="A">A-Z</option>
                <option value="Z">Z-A</option>
            </select>

            <select className={style.select} name="orderHS" onChange={handleOrdenNivel}>
                <option value=''>Order by Health-Score</option>
                <option value="Max">Máximo</option>
                <option value="Min">Mínimo</option>
            </select>

            <select className={style.select} name="filterD" onChange={handleFiltrarDieta}>
                <option value='All'>Filter by Type of Diet</option>
                {dietas.map((dieta) => (
                    <option key={dieta.id} value={dieta.nombre}>
                        {dieta.nombre}
                    </option>
                ))}
            </select>

            <select className={style.select} name="filterO" onChange={handleFiltrarOrigen}>
                <option value='All'>Filter by Origin</option>
                <option value="db">Created recipes</option>
                <option value="api">API recipes</option>
            </select>

        </div>
    )
}

export default Filters;
