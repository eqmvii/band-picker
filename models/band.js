'use strict';
module.exports = (sequelize, DataTypes) => {
  var Band = sequelize.define('Band', {
    name: DataTypes.STRING,
    stage: DataTypes.STRING,
    time: DataTypes.DATE,
    day: DataTypes.STRING
  }, {});

  // TODO: Add function to return better formatted time
  Band.prototype.getHours = function() {
    var master_time = new Date(this.time);
    return master_time.getHours().toString()
  }

  Band.associate = function(models) {
    Band.belongsToMany(models.User, {through: 'BandUser'});
  };

  return Band;
};
