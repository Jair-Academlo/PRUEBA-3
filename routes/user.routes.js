const express = require('express');
const {
  registrarusuario,
  iniciarSession,
  actualizarTitulo,
  desabilitarUsuario,
  cuentasActivas,
} = require('../controllers/user.controller');

const { userExist } = require('../middlewares/user.middleware');
const {
  protectSession,
  protectUserAcount,
} = require('../middlewares/auth.middelaware');

const router = express.Router();

router.post('/signup', registrarusuario);
router.post('/login', iniciarSession);

//protect session+
//router.use(protectSession);
router.get('/', cuentasActivas);
router.patch(
  '/:id',
  protectSession,
  userExist,
  protectUserAcount,
  actualizarTitulo
);
router.delete('/:id', desabilitarUsuario);

module.exports = { userRouter: router };
