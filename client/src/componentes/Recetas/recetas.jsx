/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecetas } from "../../redux/actions";
import CardRecetas from "../Card/CardRecetas";
import style from '../Card/CardRecetas.module.css';

const recetas = () => {
    const dispatch = useDispatch()
    const recetas = useSelector((state) => state.recetas);

    useEffect(() => {
        dispatch(getRecetas())

    }, [])

    return (
        <div className={style.row}>
            {
                recetas.map((recetas) => {
                    return (
                        <CardRecetas
                            key={recetas.id}
                            imagen={recetas.imagen}
                            nombre={recetas.nombre}
                            tipos_de_dietas={recetas.dietas}
                        />
                    )
                })
            }
        </div>
    )
}

export default recetas;