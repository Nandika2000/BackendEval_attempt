'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agents.init({
    name: DataTypes.STRING,
    originCountry: DataTypes.STRING,
    class: DataTypes.STRING,
    gender: DataTypes.STRING,
    abilities: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'agents',
  });
  return agents;
};