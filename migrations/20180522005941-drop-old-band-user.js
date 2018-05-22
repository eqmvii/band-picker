'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('banduser');
  },

  down: (queryInterface, Sequelize) => {
    // there is no turning back
  }
};
