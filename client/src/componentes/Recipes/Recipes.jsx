/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecetas } from "../../redux/actions";
import CardRecetas from "../Card/CardRecetas";
import style from '../Card/CardRecetas.module.css';
import Navbar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination"

const Recipes = () => {
    const registrosPorPag = 9
    const visiblePageButtons = 10;
    const dispatch = useDispatch()

    const recetas = useSelector((state) => state.recetas);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        dispatch(getRecetas())
    }, [])

    const totalPag = (Math.ceil(recetas.length / registrosPorPag))

    const handleCambiarPag = (pagina) => {
        setPaginaActual(pagina);
    };

    const handleSiguientePag = () => {
        setPaginaActual(paginaActual + 1);
    };

    const handlePagAnterior = () => {
        setPaginaActual(paginaActual - 1);
    };
    return (
        <div>
            <Navbar />

            <SearchBar />

            <Filters />

            <div className={style.row}>
                {
                    recetas.map((recetas) => {
                        return (
                            <CardRecetas
                                id={recetas.id}
                                imagen={recetas.imagen}
                                nombre={recetas.nombre}
                                tipos_de_dietas={recetas.dietas}
                            />
                        )
                    })
                }
            </div>

            <Pagination
                paginaActual={paginaActual}
                totalPag={totalPag}
                handlePagAnterior={handlePagAnterior}
                handleCambiarPag={handleCambiarPag}
                handleSiguientePag={handleSiguientePag}
            />

        </div>

    )
}

export default Recipes;