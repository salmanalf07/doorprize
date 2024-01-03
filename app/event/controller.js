var Event = require("../event/model");
var Participant = require("../draw/model");
var Doorprize = require("../home/model");
var session = require("express-session");
const { Sequelize, Op } = require("sequelize");
const excel = require("exceljs");
const Users = require("../login/model");

module.exports = {
  index: async (req, res) => {
    try {
      res.render("backend/event", {
        title: "Event",
        page_name: "event",
        page_open: "",
        session: req.session.user,
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
            nameEvent: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            dateEvent: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
      if (session.otoritas === "user") {
        where["user_id"] = session.id;
      }

      if (typeof req.query.order == "undefined") {
        var orderColumn = "id";
        var order = "desc";
      } else {
        var ColumnId = req.query.order["0"]["column"] || 0;
        var orderColumn = req.query.columns[ColumnId]["data"];
        var order = req.query.order["0"]["dir"];
      }
      const totalRows = await Event.count({
        where: where,
      });
      const totalPage = Math.ceil(totalRows / limit);
      const page = Math.min(parseInt(req.query.start) / limit, totalPage - 1);
      const offset = page * limit;
      const result = await Event.findAll({
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

  eventDetail: async (req, res) => {
    var id = req.body.id;

    try {
      const getId = await Event.findByPk(id);
      res.json(getId);
    } catch (error) {
      console.log(error);
    }
  },

  eventCreate: async (req, res) => {
    const { nameEvent, dateEvent } = req.body;
    try {
      const [user, created] = await Event.findOrCreate({
        where: { nameEvent: nameEvent },
        defaults: {
          user_id: req.session.user.id,
          nameEvent: nameEvent,
          dateEvent: dateEvent,
        },
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
          msg: "Email Anda Sudah Terdaftar",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  eventDelete: async (req, res) => {
    var id = req.body.id;
    try {
      await Event.destroy({
        where: {
          id: id,
        },
      });
      res.json({ emoji: "bi-emoji-smile-fill", msg: "Data Berhasil Terhapus" });
    } catch (error) {
      console.log(error);
    }
  },

  eventUpdate: async (req, res) => {
    const session = req.session.user;
    const { id, nameEvent, dateEvent } = req.body;
    try {
      const Events = await Event.findByPk(id);
      if (session.otoritas === "superuser" || Events.user_id === session.id) {
        Events.set({
          nameEvent: nameEvent,
          dateEvent: dateEvent,
        });
        await Events.save();
        res.json({
          emoji: "bi-emoji-smile-fill",
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

  eventReport: async (req, res) => {
    var id = req.body.id;
    let event = req.params.event;
    try {
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Report Doorprize");

      worksheet.columns = [
        { header: "No", key: "idd", width: 5 },
        {
          header: "Nama Event",
          key: "namaevent",
          width: 25,
        },
        { header: "Nama Pemenang", key: "name", width: 25 },
        { header: "Doorprize", key: "namedoorprize", width: 25 },
      ];

      var borderStyles = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      let counter = 1;

      let where = {
        "$event.nameEvent$": event,
        doorprize_id: {
          [Op.ne]: null,
        },
      };

      const Result = await Participant.findAll({
        include: [
          {
            model: Doorprize,
          },
          {
            model: Event,
          },
        ],
        where: where,
      });

      Result.forEach((participants) => {
        participants.idd = counter;
        participants.namaevent = participants.event["nameEvent"];
        participants.namedoorprize = participants.doorprize["doorprize"];
        worksheet.addRow(participants);
        counter++;
        worksheet.getRow(counter).eachCell((cell) => {
          cell.border = borderStyles;
        });
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.border = borderStyles;
      });

      worksheet.getColumn(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Report-Doorprize.xlsx"
      );

      return workbook.xlsx.write(res).then(() => {
        res.status(200);
        // console.log(Result);
      });
    } catch (error) {
      console.log(error);
    }
  },

  eventTemplate: async (req, res) => {
    let event = req.params.event;
    try {
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Import Doorprize");

      worksheet.columns = [
        {
          header: "event_id",
          key: "id",
          width: 10,
        },
        { header: "name", key: "name", width: 25 },
      ];

      var borderStyles = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      const Result = await Event.findAll({
        where: {
          nameEvent: event,
        },
      });

      let counter = 1;

      Result.forEach((participants) => {
        participants.name = "Salman";
        worksheet.addRow(participants);
        counter++;
        worksheet.getRow(counter).eachCell((cell) => {
          cell.border = borderStyles;
        });
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.border = borderStyles;
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Import-Doorprize.xlsx"
      );

      return workbook.xlsx.write(res).then(() => {
        res.status(200);
        // console.log(Result);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
