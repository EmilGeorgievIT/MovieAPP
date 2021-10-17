const sequelize = require('../database/mysql-database');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  thePilot: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  photo: {
    type: DataTypes.BLOB('long'),
    defaultValue: null
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  director: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  rank: {
    type: DataTypes.DECIMAL(10,4),
    defaultValue: null
  },
  boxoffice: {
    type: DataTypes.DECIMAL(50,20),
    defaultValue: null
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  releaseDate: {
    type: DataTypes.DATE,
    defaultValue: null
  },
});

module.exports = Movie;