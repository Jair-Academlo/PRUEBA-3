const { Games } = require('../models/games.model');

const crearJuego = async (req, res) => {
  try {
    const { title, genre } = req.body;

    const nuevoJuego = await Games.create({ title, genre });

    res.status(201).json({
      message: 'Nuevo juego creado',
      status: 'operacion exitosa',
      nuevoJuego,
    });
  } catch (error) {
    console.log(error);
  }
};

const todosLosJuegos = async (req, res) => {
  try {
    const Allgames = await Games.findAll();

    res.status(200).json({
      message: 'todos los juegos creados',
      status: 'operacion exitosa',
      Allgames,
    });
  } catch (error) {
    console.log(error);
  }
};

const ActualizarTitulo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const tituloId = await Games.findOne({ where: { id } });

    if (!tituloId) {
      return res.status(404).json({
        message: 'no se pudo Actualizar el juego',
        status: 'operacion fallida',
      });
    } else {
      await tituloId.update({ title });
    }

    res.status(200).json({
      message: 'El titulo se ha Actualizado',
      status: 'operacion exitosa',
      tituloId,
    });
  } catch (error) {
    console.log(error);
  }
};

const desabilitarJuego = async (req, res) => {
  try {
    const { id } = req.params;

    const tituloId = await Games.findOne({ where: { id } });

    if (!tituloId) {
      return res.status(404).json({
        message: 'no se pudo desabilitar el juego',
        status: 'operacion fallida',
      });
    } else if (tituloId.status === 'active') {
      await tituloId.update({ status: 'disable' });
    } else {
      return res.status(404).json({
        message: 'no se pudo desabilitar, no es un status active',
        status: 'operacion fallida',
      });
    }

    res.status(200).json({
      message: 'Juego  desabilitado',
      status: 'operacion exitosa',
      tituloId,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  crearJuego,
  todosLosJuegos,
  ActualizarTitulo,
  desabilitarJuego,
};