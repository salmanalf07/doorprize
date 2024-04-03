const { Sequelize, DataTypes } = require("sequelize");
var db = require("../../database/database");
var Events = require("../event/model");
var Home = require("../home/model");
var Priority = require("../priority/model");

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
    priorityId: {
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
Participant.belongsTo(Priority, {
  foreignKey: "priorityId",
});

(async () => {
  await db.sync();
})();

module.exports = Participant;
