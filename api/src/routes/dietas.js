const { Router } = require('express'); //<--- se puede hacer con destructuring
const dietasRouter = Router();

const { obtenerDietas } = require('../controllers/dietas')

dietasRouter.get('/', async (req, res) => {
    try {
        const dietas = await obtenerDietas();
        res.status(200).json(dietas)
    } catch (error) {
        return res.status(500).send({ "error": error.message })
    }
})

module.exports = dietasRouter;