/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerName: {
        type: Sequelize.STRING,
      },
      playerTag: {
        type: Sequelize.STRING,
      },
      agentPlayed: {
        type: Sequelize.STRING,
      },
      gunKills: {
        type: Sequelize.INTEGER,
      },
      abilityImpact: {
        type: Sequelize.JSON,
      },
      overallScore: {
        type: Sequelize.FLOAT,
      },
      teamName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matchs');
  },
};
