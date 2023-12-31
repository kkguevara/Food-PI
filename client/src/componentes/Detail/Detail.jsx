import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from './Detail.module.css'
import Navbar from "../NavBar/Navbar";
import { getRecetasId } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecetasId(id))
    }, [id])

    const recipeDetail = useSelector((state) => state.recipeDetail);
    const showContent = recipeDetail; // esto es para renderizar cuando receta tenga valor => true

    return (
        <>
            {showContent && (
                <div>
                    <Navbar />

                    <img className={style.image} alt='imagen' src={recipeDetail.imagen} />
                    <div className={style.details}>
                        <h1 className={style.title}>{recipeDetail.nombre}</h1>
                        <h2>ID: {id}</h2>
                        <h4>Diets: {recipeDetail.dietas.join(', ')}</h4>
                        <h4>Health-Score: <span className={style.health}>{recipeDetail.nivel_comida}</span></h4>
                        <div dangerouslySetInnerHTML={{ __html: recipeDetail.resumen }} />
                        <h4 className={style.steps}>Instructions:</h4>

                        {
                            recipeDetail.origen === 'db' ? (
                                <ul>{recipeDetail.pasos.map(
                                    (paso) => {
                                        return <li>{paso}</li>
                                    }
                                )}
                                </ul>
                            ) : (
                                <ul>{recipeDetail.pasos.map(
                                    (paso) => {
                                        return <li key={paso.number}>
                                            <p><span className={style.ingredients}>Ingredientes: </span>{getIngredientes(paso.ingredients).join(', ')} </p>
                                            <p>{paso.step}</p>
                                        </li>
                                    }
                                )}
                                </ul>
                            )
                        }


                    </div>
                </div>
            )}
        </>
    );
};

const getIngredientes = (ingredientes) => {
    return ingredientes.map((ingrediente) => ingrediente.name)
}

export default Detail;
