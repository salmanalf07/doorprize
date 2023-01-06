const Doorprize = require("./model");
const Events = require("../event/model");
const Sequelize = require("sequelize");

module.exports = {
  index: async (req, res) => {
    let event = req.params.event;
    try {
      const doorprize = await Doorprize.findAll({
        attributes: ["id", "doorprize", "qty", "sisa"],
        include: {
          model: Events,
          where: {
            nameEvent: event,
          },
          attributes: ["nameEvent"],
        },
      });
      res.render("indexview", {
        title: "Door Prize",
        doorprize: doorprize,
        event: event,
      });
    } catch (error) {
      console.log(error);
    }
  },

  draw: async (req, res) => {
    const { doorprize, qty, event } = req.body;
    try {
      res.json({
        msg: "Data Berhasil Tersimpan",
        doorprize: doorprize,
        qty: qty,
        event: event,
      });
      // res.redirect(
      //   "/draw/?doorprize=" + doorprize + "&qty=" + qty + "&event=" + event
      // );
    } catch (err) {
      console.log(err);
    }
  },
};
