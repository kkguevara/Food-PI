import React from 'react'
import style from './CardRecetas.module.css';

const CardRecetas = ({ nombre, imagen, tipos_de_dietas }) => {

    return (
        <div className={style.column}>
            <div className={style.card}>
                <div><img src={imagen} alt={nombre} /></div>
                <div className={style.name}>{nombre}</div>
                <div className={style.diets}>{tipos_de_dietas.join(', ')}</div>
            </div>
        </div>
    )
}
export default CardRecetas;