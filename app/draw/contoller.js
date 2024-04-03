const Participant = require("./model");
var Event = require("../event/model");
const DoorprizeModel = require("../home/model");

module.exports = {
  index: async (req, res) => {
    const { doorprize, qty, event } = req.body;
    try {
      res.render("draw", {
        title: "Door Prize",
        qty: qty,
        event: event,
        doorprize: doorprize,
      });
    } catch (error) {
      console.log(error);
    }
  },

  names: async (req, res) => {
    const event = req.body.event;
    const doorprize = req.body.doorprize;
    try {
      const priority = await DoorprizeModel.findByPk(doorprize);
      var Prioritys = JSON.parse(priority.priority);
      const whereClause = {};
      if (!Prioritys.find((item) => item === 1)) {
        whereClause.priorityId = Prioritys;
      }
      const names = await Participant.findAll({
        attributes: ["id", "name"],
        include: {
          model: Event,
          where: {
            nameEvent: event,
          },
        },
        where: {
          doorprize_id: null,
          skip: null,
          ...whereClause,
        },
      });

      res.json({
        msg: "200",
        data: names,
      });
    } catch (err) {
      console.log(err);
    }
  },

  save: async (req, res) => {
    const { event, doorprize, draw, skip } = req.body;

    try {
      if (draw) {
        for (let h = 0; h < draw.length; h++) {
          await Participant.update(
            { doorprize_id: doorprize },
            {
              where: {
                id: draw[h],
              },
            }
          );
        }

        const data = await DoorprizeModel.findByPk(doorprize);

        await DoorprizeModel.update(
          { sisa: data.sisa + draw.length },
          {
            where: {
              id: doorprize,
            },
          }
        );
      }

      if (skip) {
        for (let i = 0; i < skip.length; i++) {
          await Participant.update(
            { skip: 1 },
            {
              where: {
                id: skip[i],
              },
            }
          );
        }
      }

      res.json({
        msg: "200",
        event: event,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
