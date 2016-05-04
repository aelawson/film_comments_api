'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  });
  return User;
};
