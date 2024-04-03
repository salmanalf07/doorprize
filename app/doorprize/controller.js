var Doorprize = require("../home/model");
var Event = require("../event/model");
const { Op } = require("sequelize");
const Users = require("../login/model");
const Priority = require("../priority/model");

module.exports = {
  index: async (req, res) => {
    try {
      const session = req.session.user;
      let wheresession = {};
      if (session.otoritas === "user") {
        wheresession["user_id"] = session.id;
      }
      const nameEvent = await Event.findAll({
        attributes: ["id", "user_id", "nameEvent"],
        where: wheresession,
      });
      const priority = await Priority.findAll();
      res.render("backend/doorprize", {
        title: "List Doorprize",
        page_name: "doorprize",
        page_open: "",
        session: req.session.user,
        event: nameEvent,
        priority: priority,
      });
    } catch (error) {
      console.log(error);
    }
  },

  datatable: async (req, res) => {
    try {
      const session = req.session.user;
      const limit = parseInt(req.query.length) || 10;
      const search = req.query.search["value"] || "";

      let where = {
        [Op.or]: [
          {
            $doorprize$: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            "$event.nameEvent$": {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
      if (session.otoritas === "user") {
        where["$event.user_id$"] = session.id;
      }

      if (typeof req.query.order == "undefined") {
        var orderColumn = "id";
        var order = "asc";
      } else {
        var ColumnId = req.query.order["0"]["column"] || 0;
        var orderColumn = req.query.columns[ColumnId]["data"];
        var order = req.query.order["0"]["dir"];
      }
      const totalRows = await Doorprize.count({
        include: [
          {
            model: Event,
          },
        ],
        where: where,
      });
      const totalPage = Math.ceil(totalRows / limit);
      const page = Math.min(parseInt(req.query.start) / limit, totalPage - 1);
      const offset = page * limit;
      const result = await Doorprize.findAll({
        include: [
          {
            model: Event,
          },
        ],
        where: where,
        offset: offset,
        limit: limit,
        order: [[orderColumn, order]],
      });

      res.json({
        data: result,
        page: page,
        limit: limit,
        iTotalRecords: totalRows,
        iTotalDisplayRecords: totalRows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Detail: async (req, res) => {
    var id = req.body.id;

    try {
      const getId = await Doorprize.findByPk(id);
      res.json(getId);
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    const { event_id, doorprize, qty, priority } = req.body;
    try {
      const created = await Doorprize.create({
        event_id: event_id,
        doorprize: doorprize,
        qty: qty,
        priority: JSON.stringify(priority),
      });
      if (created) {
        res.json({
          emoji: "bi-emoji-smile-fill",
          att: "success",
          msg: "Data Berhasil Tersimpan",
        });
      } else {
        res.json({
          emoji: "bi-emoji-dizzy-fill",
          att: "danger",
          msg: "Data gagal tersimpan",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteData: async (req, res) => {
    var id = req.body.id;
    try {
      await Doorprize.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        emoji: "bi-emoji-smile-fill",
        att: "success",
        msg: "Data Berhasil Terhapus",
      });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    const session = req.session.user;
    const { id, doorprize, qty, priority } = req.body;
    try {
      const Doorprizes = await Doorprize.findByPk(id, {
        include: [
          {
            model: Event,
          },
        ],
      });
      if (
        session.otoritas === "superuser" ||
        Doorprizes.event.user_id === session.id
      ) {
        Doorprizes.set({
          doorprize: doorprize,
          qty: qty,
          priority: JSON.stringify(priority),
        });
        await Doorprizes.save();
        res.json({
          emoji: "bi-emoji-smile-fill",
          att: "success",
          msg: "Data Berhasil Tersimpan",
        });
      } else {
        res.json({
          emoji: "bi-emoji-dizzy-fill",
          att: "danger",
          msg: "Data gagal diupdate",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
