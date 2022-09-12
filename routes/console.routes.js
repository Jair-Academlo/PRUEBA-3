const express = require('express');

const {
  crearConsole,
  todasLasConsolas,
  actualizarConsola,
  desabilitarConsola,
  assignGame,
} = require('../controllers/console.controller');

const router = express.Router();

router.post('/', crearConsole);
router.post('/assign', assignGame);
router.get('/', todasLasConsolas);
router.patch('/:id', actualizarConsola);
router.delete('/:id', desabilitarConsola);

module.exports = { consoleRouter: router };
