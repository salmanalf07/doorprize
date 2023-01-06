const { Sequelize, DataTypes } = require("sequelize");
var db = require("../../database/database");
var Events = require("../event/model");
var Home = require("../home/model");

const Participant = db.define(
  "participants",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
    doorprize_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    skip: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

Participant.belongsTo(Home, {
  foreignKey: "doorprize_id",
  allowNull: true,
});

Participant.belongsTo(Events, {
  foreignKey: "event_id",
});

(async () => {
  await db.sync();
})();

module.exports = Participant;
