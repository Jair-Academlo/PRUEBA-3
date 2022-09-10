const express = require('express');
const {
  registrarusuario,
  iniciarSession,
  actualizarTitulo,
  desabilitarUsuario,
  cuentasActivas,
} = require('../controllers/user.controller');

const {
  createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExist } = require('../middlewares/user.middleware');
const {
  protectSession,
  protectUserAcount,
} = require('../middlewares/auth.middelaware');

const router = express.Router();

router.post('/signup', createUserValidators, registrarusuario);
router.post('/login', iniciarSession);

//protect session+
//router.use(protectSession);
router.get('/', cuentasActivas);
router.patch(
  '/:id',
  protectSession, // protege la session verificando el token
  userExist, //valida que el id exista, en caso que no envia
  // mensaje de error
  protectUserAcount, //valida que el id de Protect session
  //sea el mismo que el de usereExist
  //para poder actualizar en caso contrario
  // no dejara actualizar
  actualizarTitulo //si todo sale bein deja actualizar.
);
router.delete(
  '/:id',
  protectSession,
  userExist,
  protectUserAcount,
  desabilitarUsuario
);

module.exports = { userRouter: router };
