'use strict';
module.exports = (sequelize, DataTypes) => {
  var Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    stage: DataTypes.STRING,
    time: DataTypes.DATE,
    day: DataTypes.STRING
  }, {});
  Band.associate = function(models) {
    // associations can be defined here
  };
  return Band;
};
