const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const { Users } = require('../models/users.model');

const protectSession = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(404).json({
        message: 'no se ha autenticado con token',
        status: 'operacion fallida',
      });
    }

    const token = authorization.split(' ')[1];

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({
      where: {
        id: decode.id,
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'El propietario de este token  no existe',
        status: 'operacion fallida',
      });
    }

    req.sessionUser = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

const protectUserAcount = async (req, res, next) => {
  try {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
      return res.status(404).json({
        message: 'Tu no eres el propietario de esta cuenta',
        status: 'Permiso denegado,',
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { protectSession, protectUserAcount };
