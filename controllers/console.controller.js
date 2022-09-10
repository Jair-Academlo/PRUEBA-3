const { Consoles } = require('../models/consoles.model');

const crearConsole = async (req, res) => {
  try {
    const { name, company } = req.body;
    const consoleName = await Consoles.findOne({ where: { name } });

    if (consoleName) {
      return res.status(404).json({
        message: 'La consola ya existe',
        status: 'operacion fallida',
      });
    }

    const nuevaConsola = await Consoles.create({ name, company });

    res.status(201).json({
      message: 'Console creada',
      status: 'operacion exitosa',
      nuevaConsola,
    });
  } catch (error) {
    console.log(error);
  }
};

const todasLasConsolas = async (req, res) => {
  try {
    const allConsoles = await Consoles.findAll();

    res.status(200).json({
      message: 'Estas son todas las consolas creadas',
      status: 'operacion exitosa',
      allConsoles,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { crearConsole, todasLasConsolas };
