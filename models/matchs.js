/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class matchs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  matchs.init({
    playerName: DataTypes.STRING,
    playerTag: DataTypes.STRING,
    agentPlayed: DataTypes.STRING,
    gunKills: DataTypes.INTEGER,
    abilityImpact: DataTypes.JSON,
    overallScore: DataTypes.FLOAT,
    teamName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'matchs',
  });
  return matchs;
};
