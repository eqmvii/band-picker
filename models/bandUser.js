'use strict';
module.exports = (sequelize, DataTypes) => {
  var BandUser = sequelize.define('BandUser', {
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: null
      }
  }, {});

  // no association; join through table

  return BandUser;
};
