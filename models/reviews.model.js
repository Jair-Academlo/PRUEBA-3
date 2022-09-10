const { DataTypes, db } = require('../utils/databae');
const { Games } = require('./games.model');
const { Users } = require('./users.model');

const Reviews = db.define('reviews', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Games,
      key: 'id',
    },
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { Reviews };
