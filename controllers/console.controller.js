const { Consoles } = require('../models/consoles.model');
const { Games } = require('../models/games.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');

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

const assignGame = async (req, res) => {
  try {
    const { gameId, consoleId } = req.body;

    const gameInConsole = await GamesInConsoles.create({
      gameId,
      consoleId,
    });

    res.status(201).json({
      status: 'success',
      gameInConsole,
    });
  } catch (error) {
    console.log(error);
  }
};

const todasLasConsolas = async (req, res) => {
  try {
    const allConsoles = await Consoles.findAll({
      include: [
        {
          model: Games,
        },
      ],
    });

    res.status(200).json({
      message: 'Estas son todas las consolas creadas',
      status: 'operacion exitosa',
      allConsoles,
    });
  } catch (error) {
    console.log(error);
  }
};

const actualizarConsola = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateConsole = await Consoles.findOne({ where: { id } });

    if (!updateConsole) {
      return res.status(404).json({
        message: 'No se pudo actualizar consola, no se encontro el iD',
        status: 'operacion fallida',
      });
    } else {
      await updateConsole.update({ name });
    }

    res.status(200).json({
      message: 'El nombre de la consola se ha actualizado',
      status: 'operacion exitosa',
      updateConsole,
    });
  } catch (error) {
    console.log(error);
  }
};

const desabilitarConsola = async (req, res) => {
  try {
    const { id } = req.params;

    const disableConsole = await Consoles.findOne({
      where: { id },
    });

    if (!disableConsole) {
      return res.status(404).json({
        message: 'No se pudo desabilitar la consola, el iD no fue encontrado',
        status: 'operacion fallida',
      });
    } else if (disableConsole.status !== 'active') {
      return res.status(404).json({
        message: 'No se pudo desabilitar el consola, status distinti de active',
        status: 'operacion fallida',
      });
    }

    await disableConsole.update({ status: 'disabled' });

    res.status(202).json({
      message: 'La consola se ha desabilitado',
      status: 'operacion exitosa',
      disableConsole,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  crearConsole,
  todasLasConsolas,
  actualizarConsola,
  desabilitarConsola,
  assignGame,
};
