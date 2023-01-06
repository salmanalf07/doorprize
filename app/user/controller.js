var User = require("../login/model");
var bcrypt = require("bcrypt");
var session = require("express-session");
const { Op } = require("sequelize");
const ldap = require("ldapjs");

module.exports = {
  index: async (req, res) => {
    try {
      res.render("backend/detailuser", {
        title: "Pengguna Aplikasi",
        page_name: "user",
        page_open: "open",
        session: req.session.user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  datatable: async (req, res) => {
    try {
      const page = parseInt(req.query.start) || 0;
      const limit = parseInt(req.query.length) || 10;
      const search = req.query.search["value"] || "";
      if (typeof req.query.order == "undefined") {
        var orderColumn = "id";
        var order = "asc";
      } else {
        var ColumnId = req.query.order["0"]["column"] || 0;
        var orderColumn = req.query.columns[ColumnId]["data"];
        var order = req.query.order["0"]["dir"];
      }
      const offset = limit * page;
      const totalRows = await User.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await User.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: limit,
        order: [[orderColumn, order]],
      });

      res.json({
        data: result,
        page: page,
        limit: limit,
        iTotalRecords: totalRows,
        iTotalDisplayRecords: totalPage,
      });
    } catch (error) {
      console.log(error);
    }
  },

  userDetail: async (req, res) => {
    var id = req.body.id;

    try {
      const getId = await User.findByPk(id);
      res.json(getId);
    } catch (error) {
      console.log(error);
    }
  },

  userCreate: async (req, res) => {
    const { nameUser, emailUser, password } = req.body;
    // if (password !== confPassword)
    //   return res
    //     .status(400)
    //     .json({ msg: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: emailUser },
        defaults: {
          name: nameUser,
          email: emailUser,
          password: hashPassword,
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

  userDelete: async (req, res) => {
    var id = req.body.id;
    try {
      await User.destroy({
        where: {
          id: id,
        },
      });
      res.json({ emoji: "bi-emoji-smile-fill", msg: "Data Berhasil Terhapus" });
    } catch (error) {
      console.log(error);
    }
  },

  userUpdate: async (req, res) => {
    const { id, nameUser, emailUser, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await User.update(
        {
          name: nameUser,
          email: emailUser,
          password: hashPassword,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.json({
        emoji: "bi-emoji-smile-fill",
        msg: "Data Berhasil Tersimpan",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
