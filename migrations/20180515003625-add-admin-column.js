'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'admin', Sequelize.BOOLEAN, { defaultValue: false });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'admin');
  }
};
