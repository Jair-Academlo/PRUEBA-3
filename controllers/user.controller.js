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
      expiresIn: '8h',
    });

    res.status(200).json({
      message: 'todo salio bien',
      status: 'operacion exitosa',
      user,
      //token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registrarusuario, iniciarSession };
