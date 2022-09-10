const { DataTypes, db } = require('../utils/databae');
const { Games } = require('../models/games.model');
const { Consoles } = require('../models/consoles.model');

const GamesInConsoles = db.define('gamesInConsoles', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  gameId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Games,
      key: 'id',
    },
  },
  consoleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Consoles,
      key: 'id',
    },
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { GamesInConsoles };
