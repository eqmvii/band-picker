'use strict';

var bcrypt = require('bcrypt');

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

  // TODO: Swap to promises, un-hard-code-stuff
  User.prototype.validPassword = function (password, cb) {
    console.log(this);
    if (this.username === 'admin') { // shhh
      cb(password === this.password);
    } else {
      bcrypt.compare(password, this.password, function (err, res) {
        if (err) {
          console.log(err);
        }
        cb(res);
      });
    }
  };

  User.hook("beforeCreate", function (user) {
    // 10 is default, 14 is noticeably slow
    return bcrypt.hash(user.password, bcrypt.genSaltSync(12))
      .then(hashedPw => {
        user.password = hashedPw;
      });
  });

  User.associate = function (models) {
    User.belongsToMany(models.Band, { through: 'BandUser' });
  };

  return User;
};
