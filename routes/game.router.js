const express = require('express');

const {
  crearJuego,
  todosLosJuegos,
  ActualizarTitulo,
  desabilitarJuego,
} = require('../controllers/game.controller');

const router = express.Router();

router.post('/', crearJuego);
router.get('/', todosLosJuegos);
router.patch('/:id', ActualizarTitulo);
router.delete('/:id', desabilitarJuego);

module.exports = { gameRouter: router };
