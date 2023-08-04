// los controladores se encargan de la logica de la ruta
const { Dieta } = require('../db');
const axios = require('axios');

// variables de entorno
const { API_KEY, API_URL } = process.env

const obtenerDietas = async () => {

    //const { data } = await axios(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const { data } = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

    let dietas = [];

    data.results.map((recetas) => {
        recetas.diets.map((dieta) => {
            dietas.push(dieta);
        });
    });

    dietas = [...new Set(dietas)]

    for (const dieta of dietas) {
        await Dieta.findOrCreate({
            where: { nombre: dieta }
        })
    }

    const dietasBD = Dieta.findAll()

    return dietasBD;
};

module.exports = {
    obtenerDietas,
}