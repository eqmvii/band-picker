'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'profile_pic_url',
      Sequelize.STRING,
      { defaultValue: "https://s3.us-east-2.amazonaws.com/eqmvii-burgereater/me.png" });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'profile_pic_url');
  }
};
