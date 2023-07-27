import { GET_RECETAS, GET_NAME, GET_DIETAS, POST_DIETAS } from "./action-types";

const initialState = {
    recetas: [],
    name: {},
    dietas: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_RECETAS:
            return {
                ...state,
                recetas: payload // esta trayendo dos el array con las recetas
            }


        default:
            return { ...state }
    }


}

export default reducer;