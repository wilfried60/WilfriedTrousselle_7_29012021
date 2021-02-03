'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Commentaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentaire: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usersurname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      MessageId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Commentaires');
  }
};