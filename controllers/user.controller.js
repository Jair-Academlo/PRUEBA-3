const { Users } = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

async function registrarusuario(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    //valida que el email no exista al momento de crearlo.
    if (user) {
      return res.status(404).json({
        message: 'El email ya existe',
        status: 'operacion fallida',
      });
    }

    //const salt = await bcrypt.genSalt(12);
    //const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({ name, email, password });

    //newUser.password = undefined;

    res.status(201).json({
      message: 'usuario creado',
      status: 'operacion exitosa',
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
}

const iniciarSession = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: 'credenciales invalidas',
        status: 'operacion fallida',
      });
    } else if (password !== user.password) {
      return res.status(404).json({
        message: 'el password no coincide',
        status: 'operacion fallida',
      });
    }

    /* const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(404).json({
        message: 'fallo password',
        status: 'operacion fallida',
      });
    }*/

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '3 days',
    });

    res.status(200).json({
      message: 'todo salio bien',
      status: 'operacion exitosa',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const actualizarTitulo = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    //const userId = await Users.findOne({ where: { id } });

    /*if (!user) {
      return res.status(404).josn({
        message: 'no se pudo actualizar el titulo, id no encontrado',
        status: 'operacion fallida',
      });
    } else {*/
    await user.update({ name, email });
    //}

    res.status(200).json({
      message: 'datos actualizados',
      status: 'operacion exitosa',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const desabilitarUsuario = async (req, res, next) => {
  try {
    const { user } = req;

    // const userId = await Users.findOne({ where: { id } });

    /* if (!userId) {
      return res.status(404).json({
        message: 'la cuenta no se puede desabilitar, id no encontrado',
        status: 'operacion fallida',
      });
    } else */ if (user.status === 'active') {
      await user.update({ status: 'disable' });
    } else {
      return res.status(404).json({
        message: 'la cuenta no se puede desabilitar, el status no es activo',
        status: 'operacion fallida',
      });
    }

    res.status(200).json({
      message: 'cuenta desabilitada',
      status: 'operacion exitosa',
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const cuentasActivas = async (req, res) => {
  try {
    const allUsers = await Users.findAll({ where: { status: 'active' } });

    res.status(200).json({
      message: 'todos los usuarios activos',
      status: 'operacion exitosa',
      allUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registrarusuario,
  iniciarSession,
  actualizarTitulo,
  desabilitarUsuario,
  cuentasActivas,
};
