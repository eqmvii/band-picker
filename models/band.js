'use strict';
module.exports = (sequelize, DataTypes) => {
  var Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    stage: DataTypes.STRING,
    time: DataTypes.DATE,
    day: DataTypes.STRING
  }, {});
  Band.associate = function(models) {
    Band.belongsToMany(models.User, {through: 'BandUser'});
  };
  return Band;
};
