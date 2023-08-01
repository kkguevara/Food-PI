import React from 'react'
import style from './CardRecetas.module.css';
import { Link } from 'react-router-dom';

const CardRecetas = ({ id, nombre, imagen, tipos_de_dietas }) => {

    return (

        <div className={style.column}>
            <div className={style.card}>
                <div><img src={imagen} alt={nombre} /></div>
                <Link to={`/detalleRecipe/${id}`}>
                    <div className={style.name}>{nombre}</div>
                </Link>
                <div className={style.diets}>{tipos_de_dietas.join(', ')}</div>
            </div>
        </div>
    )
}

export default CardRecetas;