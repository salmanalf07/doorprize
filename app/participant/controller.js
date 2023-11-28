var Doorprize = require("../home/model");
var Event = require("../event/model");
var Participant = require("../draw/model");
const { Op } = require("sequelize");
const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  index: async (req, res) => {
    try {
      const session = req.session.user;
      let wheresession = {};
      if (session.otoritas === "user") {
        wheresession["user_id"] = session.id;
      }
      res.render("backend/participant", {
        title: "List Participant",
        page_name: "participant",
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
            $name$: {
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
      const totalRows = await Participant.count({
        include: [
          {
            model: Event,
          },
          {
            model: Doorprize,
          },
        ],
        where: where,
      });
      const totalPage = Math.ceil(totalRows / limit);
      const page = Math.min(parseInt(req.query.start) / limit, totalPage - 1);
      const offset = page * limit;
      const result = await Participant.findAll({
        include: [
          {
            model: Event,
            where: where,
          },
          {
            model: Doorprize,
          },
        ],
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
    }
  },

  deleteData: async (req, res) => {
    var id = req.body.id;
    try {
      await Participant.destroy({
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

  importExcel: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      let path =
        __dirname + "/../../public/assets/uploads/" + req.file.filename;

      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();

        let participants = [];

        rows.forEach((row) => {
          let Participant = {
            event_id: row[0],
            name: row[1],
          };

          participants.push(Participant);
        });

        Participant.bulkCreate(participants)
          .then(() => {
            res.status(200).send({
              emoji: "bi-emoji-smile-fill",
              att: "success",
              msg: "Data Berhasil Tersimpan",
            });

            fs.unlink(path, (err) => {
              if (err) {
                throw err;
              }
              // console.log("Delete File successfully.");
            });
          })
          .catch((error) => {
            res.status(500).send({
              emoji: "bi-emoji-dizzy-fill",
              att: "danger",
              msg: "Data gagal disimpan",
              error: error.message,
            });
          });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  },
};
