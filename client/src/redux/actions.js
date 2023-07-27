import { GET_RECETAS, GET_NAME, GET_DIETAS, POST_DIETAS } from "./action-types";
import axios from "axios";


export const getRecetas = () => {
    return async function (dispatch) {
        let respuesta = await axios.get('http://localhost:3001/recipes');
        console.log(respuesta)
        return dispatch({ type: GET_RECETAS, payload: respuesta.data })
    }

}