const express = require('express');
const {
  registrarusuario,
  iniciarSession,
  actualizarTitulo,
  desabilitarUsuario,
  cuentasActivas,
} = require('../controllers/user.controller');

const { userExist } = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/signup', registrarusuario);
router.post('/login', iniciarSession);
router.patch('/:id', actualizarTitulo);
router.delete('/:id', desabilitarUsuario);
router.get('/', cuentasActivas);
module.exports = { userRouter: router };
