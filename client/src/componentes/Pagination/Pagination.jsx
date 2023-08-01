import React, { useState, useEffect } from 'react'
import style from './Pagination.module.css'
import { Link } from "react-router-dom";

const Pagination = ({ paginaActual, totalPag, handlePagAnterior, handleCambiarPag, handleSiguientePag }) => {
    const [inputPage, setInputPage] = useState(paginaActual);

    useEffect(() => {
        setInputPage(paginaActual);
    }, [paginaActual]);

    const handleInputChange = (event) => {
        setInputPage(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        const newPage = parseInt(inputPage);
        if (newPage >= 1 && newPage <= totalPag) {
            handleCambiarPag(newPage);
        } else {
            setInputPage(paginaActual);
        }
    };

    const paginaInicio = 1;

    return (
        <div className={style.center}>
            <div className={style.pagination}>
                <Link onClick={handlePagAnterior}>&laquo;</Link>
                {Array.from({ length: totalPag - 1 }).map((_, i) => {
                    const nroPag = paginaInicio + i;
                    const buttonClass = nroPag === paginaActual ? style.active : "";
                    return <Link className={buttonClass} onClick={handleInputKeyDown()}>{nroPag}</Link>
                })}
                <Link onClick={handleSiguientePag}>&raquo;</Link>
            </div>
        </div>

    )
}

export default Pagination;
