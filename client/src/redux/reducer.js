import { GET_RECETAS, GET_DIETAS, POST_RECETAS, ORDER_RECETAS, ORDER_NIVEL_COMIDA, FILTRAR_POR_DIETA, GET_RECETAS_ID, FILTRAR_POR_ORIGEN } from "./action-types";

const initialState = {
    recetas: [],
    dietas: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_RECETAS:
            return {
                ...state,
                recetas: payload // esta trayendo dos el array con las recetas
            }

        case GET_RECETAS_ID:
            return {
                ...state,
                recipeDetail: payload // esta trayendo dos el array con las recetas
            }

        case GET_DIETAS:
            return {
                ...state,
                dietas: payload
            };
        case POST_RECETAS:
            return {
                ...state,
                recetas: [...state.recetas, payload]
            };
        case ORDER_RECETAS:
            const recetasOrden = [...state.recetas];
            /*a, d - ascendente
            d, a - descendente */
            return {
                ...state,
                recetas: payload === 'A'
                    ? recetasOrden.sort((a, d) => a.nombre.localeCompare(d.nombre))
                    : recetasOrden.sort((a, d) => d.nombre.localeCompare(a.nombre))
            };

        case ORDER_NIVEL_COMIDA:
            const recetasNivel = [...state.recetas];
            return {
                ...state,
                recetas: payload === 'Min'
                    ? recetasNivel.sort((a, d) => a.nivel_comida - d.nivel_comida)
                    : recetasNivel.sort((a, d) => d.nivel_comida - a.nivel_comida)
            };

        case FILTRAR_POR_DIETA:
            const recetasDietas = state.recetas.filter(receta => receta.dietas.includes(payload));
            return {
                ...state,
                recetas: recetasDietas
            };

        case FILTRAR_POR_ORIGEN:
            const recetasOrigen = state.recetas.filter(receta => receta.origen === payload);
            return {
                ...state,
                recetas: recetasOrigen
            };

        default:
            return { ...state }

    }
}

export default reducer;