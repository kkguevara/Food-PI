import { GET_RECETAS, GET_DIETAS, POST_RECETAS, ORDER_RECETAS, ORDER_NIVEL_COMIDA, FILTRAR_POR_DIETA, GET_RECETAS_ID } from "./action-types";
import axios from "axios";

export const getRecetas = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/recipes`);
            return dispatch({ type: GET_RECETAS, payload: data })
        } catch (error) {
            console.log(error.message);
        }

    }
}

export const getRecetasId = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({ type: GET_RECETAS_ID, payload: data })
        } catch (error) {
            console.log(error.message);
        }

    }
}

export const getRecetasNombre = (nombre) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/recipes?name=${nombre}`);

            dispatch({
                type: GET_RECETAS,
                payload: data
            });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const getDietas = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/dietas`)

            dispatch({
                type: GET_DIETAS,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const crearReceta = (receta) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`http://localhost:3001/recipes/`, receta);

            dispatch({
                type: POST_RECETAS,
                payload: data,
            });

        } catch (error) {
            console.log(error.message);
        }
    };
};

export const ordenarNombre = (opcion) => {
    return {
        type: ORDER_RECETAS,
        payload: opcion
    }
};

export const ordenarNivelComida = (opcion) => {
    return {
        type: ORDER_NIVEL_COMIDA,
        payload: opcion
    }
};

export const filtrarPorDieta = (dieta) => {
    return {
        type: FILTRAR_POR_DIETA,
        payload: dieta
    }
};