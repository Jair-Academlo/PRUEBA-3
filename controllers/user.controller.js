const { Users } = require('../models/users.model');

const registrarusuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await Users.create({ name, email, password });

    res.status(201).json({
      message: 'usuario creado',
      status: 'operacion exitosa',
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const iniciarSession = async (req, res) => {
  try {
    const { email, password } = req.body;

    const signIn = await Users.create({ email, password });

    res.status(201).json({
      message: 'session iniciada',
      status: 'operacion exitosa',
      signIn,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registrarusuario, iniciarSession };
