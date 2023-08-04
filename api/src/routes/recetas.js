const { Router } = require('express');


const recipesRouter = Router();

const { obtenerRecetasPorId, porNombre, buscarTodas, guardarReceta } = require('../controllers/recetas')



// buscar receta por id
recipesRouter.get('/:idRecipe', async (req, res) => {
    const { idRecipe } = req.params // eso hace referencia al request, lo que se envia

    // res hace referencia al response (resultado)

    try {
        const recipe = await obtenerRecetasPorId(idRecipe);

        if (recipe === null) res.status(404).send({ "mensaje": "no se encontro receta" })

        res.status(200).json(recipe)
    } catch (error) {
        return res.status(500).send({ "error": error.message })
    }

})

//buscar receta por name 

recipesRouter.get('/', async (req, res) => {
    const { name } = req.query // consulta a 

    if (!name) {
        try {
            const recetas = await buscarTodas()
            res.status(200).json(recetas)
        } catch (error) {
            return res.status(500).send({ "error": error.message })
        }

    } else {
        try {
            const recetasFiltradas = await porNombre(name)// conseguir x nombre

            if (recetasFiltradas.length > 0) {
                res.status(200).json(recetasFiltradas)
            } else {
                res.status(404).json({ error: `Receta con nombre no encontrado` })
            }

        } catch (error) {
            return res.status(500).send({ "error": error.message })
        }

    }

})

recipesRouter.post('/', async (req, res) => {
    try {
        await guardarReceta(req.body)
        res.status(201).json({ "message": "Guardado con exito" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})





module.exports = recipesRouter;