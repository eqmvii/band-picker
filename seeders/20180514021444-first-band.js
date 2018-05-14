'use strict';

// created with sequelize seed:generate --name first-band

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bands', [{
      name: 'fake band',
      stage: 'fake stage',
      time: new Date,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bands', null, {});
}
};
