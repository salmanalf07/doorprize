const { Sequelize, DataTypes } = require("sequelize");
var db = require("../../database/database");

const Events = db.define(
  "events",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    nameEvent: {
      type: DataTypes.STRING,
    },
    dateEvent: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Events;
