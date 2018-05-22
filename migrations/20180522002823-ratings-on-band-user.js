'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'BandUser',
      'rating',
      Sequelize.INTEGER,
      { defaultValue: null });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BandUser', 'rating');
  }
};
