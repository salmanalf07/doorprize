const { Sequelize, DataTypes } = require("sequelize");
var db = require("../../database/database");
const Events = require("../event/model");

const Doorprize = db.define(
  "doorprizes",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    doorprize: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    sisa: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

Doorprize.belongsTo(Events, {
  foreignKey: "event_id",
});

(async () => {
  await db.sync();
})();

module.exports = Doorprize;
