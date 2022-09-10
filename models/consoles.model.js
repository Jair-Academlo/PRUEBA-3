const { DataTypes, db } = require('../utils/databae');

const Consoles = db.define('consoles', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  company: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { Consoles };
