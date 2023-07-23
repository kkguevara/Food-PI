const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recetasRouter = require('./recetas');
const dietasRouter = require('./dietas');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recetasRouter)
router.use('/dietas', dietasRouter)

module.exports = router;
