const express = require('express');

const {
  crearConsole,
  todasLasConsolas,
} = require('../controllers/console.controller');

const router = express.Router();

router.post('/', crearConsole);
router.get('/', todasLasConsolas);

module.exports = { consoleRouter: router };
