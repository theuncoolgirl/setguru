'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setlist = sequelize.define('Setlist', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    setListId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comments: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    isStarred: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Setlist.associate = function (models) {
    Setlist.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Setlist;
};