'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.STRING,
    contentId: DataTypes.INTEGER,
    timeStamp: DataTypes.INTEGER,
    content: DataTypes.TEXT
  });
  return Comment;
};
