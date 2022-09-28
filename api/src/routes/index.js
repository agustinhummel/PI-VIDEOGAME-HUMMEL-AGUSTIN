const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

const { getVideogames, getById, createVideogame, getPlatforms } = require('../controllers/videogames')
const { getGender } = require('../controllers/gender')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogames)
router.get('/gender', getGender)
router.get('/videogames/:id', getById)
router.get('/vidogames/platforms', getPlatforms)
router.post('/videogames/create', createVideogame)

module.exports = router;
