import React from 'react'
import style from './CardRecetas.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecetas } from "../../redux/actions";
import Pagination from '../Pagination/Pagination';

const CardRecetas = ({ currentPage, setCurrentPage }) => {
    const recipesPerPage = 9;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecetas())
    }, [])

    const recipes = useSelector((state) => state.recetas);
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const showContent = recipes;

    return (
        <>
            {showContent && (
                <div>
                    {
                        recipes.length === 0 ? (
                            <div className={style.notfound}>No recipes found.</div>
                        ) : (
                            <div className={style.row}>
                                {
                                    recipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage).map((recetas) => {
                                        return <div className={style.column}>
                                            <div className={style.card}>
                                                <div><img src={recetas.imagen} alt={recetas.nombre} /></div>
                                                <Link to={`/detalleRecipe/${recetas.id}`}>
                                                    <div className={style.name}>{recetas.nombre}</div>
                                                </Link>
                                                <div className={style.diets}>{recetas.dietas.join(', ')}</div>
                                            </div>
                                        </div>

                                    })
                                }
                            </div>
                        )
                    }
                    <Pagination
                        currentPage={currentPage} //pagina actual
                        totalPages={totalPages}
                        handlePrevPage={handlePrevPage}
                        handlePageChange={handlePageChange}
                        handleNextPage={handleNextPage} // pagina siguiente
                    />
                </div>
            )}
        </>
    )
}

export default CardRecetas;