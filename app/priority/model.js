const { Sequelize, DataTypes } = require("sequelize");
var db = require("../../database/database");

const Priority = db.define(
  "prioritys",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    priorityName: {
      type: DataTypes.STRING,
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

module.exports = Priority;
