const express = require('express');

const {
  crearJuego,
  todosLosJuegos,
  ActualizarTitulo,
  desabilitarJuego,
  crearReseña,
} = require('../controllers/game.controller');

const { protectSession } = require('../middlewares/auth.middelaware');

const router = express.Router();

router.post('/', crearJuego);
router.get('/', todosLosJuegos);
router.patch('/:id', ActualizarTitulo);
router.delete('/:id', desabilitarJuego);
router.post('/reviews/:gameId', protectSession, crearReseña);

module.exports = { gameRouter: router };
