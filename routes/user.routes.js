const express = require('express');
const {
  registrarusuario,
  iniciarSession,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/:signup', registrarusuario);
router.post('/:login', iniciarSession);

module.exports = { userRouter: router };
