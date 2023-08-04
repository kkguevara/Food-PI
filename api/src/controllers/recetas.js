// los controladores se encargan de la logica de la ruta
const { Recetas, Dieta, Recetas_Dietas } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize')
const Uuid = require('uuid');


// variables de entorno
const { API_KEY, API_URL } = process.env

// esta funcion engloba todas la rutas 
const mapearRecetas = (data) => {
    const { id: idData, title, summary, healthScore, analyzedInstructions, image, diets, vegetarian, vegan, glutenFree } = data

    let array_dietas = []

    if (vegetarian) array_dietas.push("vegetarian")
    if (vegan) array_dietas.push("vegan")
    if (glutenFree) array_dietas.push("gluten free")

    // agrega cada valor del array diets
    diets.map(diet => array_dietas.push(diet));
    // eliminar elementos repetidos
    array_dietas = [...new Set(array_dietas)]

    const pasos = analyzedInstructions.length > 0 ? analyzedInstructions[0]['steps'] : null

    const receta = {
        "id": idData,
        "nombre": title,
        "resumen": summary,
        "nivel_comida": healthScore,
        "pasos": pasos,
        "imagen": image,
        "dietas": array_dietas,
        "origen": "api"
    }

    return receta
}

const mapearRecetasDB = (data) => {
    const { uuid, nombre, resumen_del_plato, nivel_de_comida_saludable, paso_a_paso, imagen, dieta } = data

    let array_dietas = []

    dieta.map((d) => array_dietas.push(d.nombre))

    const receta = {
        id: uuid,
        nombre,
        resumen: resumen_del_plato,
        nivel_comida: nivel_de_comida_saludable,
        pasos: paso_a_paso,
        imagen,
        dietas: array_dietas,
        origen: "db"
    }

    return receta
}

// asyncrono - promesas
const obtenerRecetasPorId = async (idReceta) => {
    let receta = null;

    // buscar la receta por id en la bd
    const recetaBD = await Recetas.findOne({
        where: { uuid: idReceta },
        include: Dieta
    });

    if (recetaBD) {
        receta = mapearRecetasDB(recetaBD)
    } else {
        // buscar la receta en la api
        // const { data } = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

        const { data } = await axios(`${API_URL}/recipes/${parseInt(idReceta)}/information?apiKey=${API_KEY}`)

        receta = mapearRecetas(data)
        // console.log(data.results.filter((d) => d.id === parseInt(idReceta)))

    }

    return receta;
};


const porNombre = async (name) => {
    let buscar = [];

    // buscar la receta por id en la bd
    const buscarBD = await Recetas.findAll({
        where: { nombre: { [Op.iLike]: `%${name}%` } }
    });


    buscarBD.map((receta) => buscar.push(mapearRecetasDB(receta)))

    // buscar la receta en la api
    const { data } = await axios(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&offset=0&addRecipeInformation=true&titleMatch=${name}`)

    data.results.map((receta) => buscar.push(mapearRecetas(receta)))


    return buscar
}

const buscarTodas = async () => {
    let buscar = [];

    const buscarBD = await Recetas.findAll({
        include: Dieta
    });


    buscarBD.map((receta) => buscar.push(mapearRecetasDB(receta)))

    // buscar la receta en la api
    // const { data } = await axios(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&offset=0&addRecipeInformation=true`)

    const { data } = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

    data.results.map((receta) => buscar.push(mapearRecetas(receta)))

    return buscar
}

const guardarReceta = async (body) => {

    const { name, image, summary, healthscore, steps, diets } = body


    const [receta, created] = await Recetas.findOrCreate({ // devuelve el valor creado o encontrado y un boolean si fue creado
        where: { nombre: name },
        defaults: {
            imagen: image,
            resumen_del_plato: summary,
            nivel_de_comida_saludable: healthscore,
            paso_a_paso: steps,
            uuid: Uuid.v4()
        }
    })

    diets.map(async (item) => {
        const [dieta, created] = await Dieta.findOrCreate({
            where: { nombre: item }
        })

        await Recetas_Dietas.create({
            dietaId: dieta.id,
            recetaId: receta.id
        })
    })

}

module.exports = {
    obtenerRecetasPorId,
    porNombre,
    buscarTodas,
    guardarReceta,
}