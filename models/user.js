'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profile_pic_url: {
      type: DataTypes.STRING,
      defaultValue: "https://s3.us-east-2.amazonaws.com/eqmvii-burgereater/me.png"
    },
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Band, { through: 'BandUser' });
  };
  return User;
};
