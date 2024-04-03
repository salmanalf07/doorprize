//import database
var User = require("./model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var session = require("express-session");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");

      const alert = { message: alertMessage };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("./backend/login", {
          title: "Express JS",
          page_title: "",
          page_name: "Login Apps Doorprize",
          alert,
        });
      } else if (req.originalUrl === "/") {
        res.redirect("/dashboard");
      } else {
        res.redirect("/" + req.originalUrl);
      }
    } catch (error) {
      console.log(error);
    }
  },

  register: async (req, res) => {
    try {
      res.render("./backend/register", {
        title: "Express JS",
        page_title: "",
        page_name: "Register",
      });
    } catch (error) {
      console.log(err);
    }
  },

  registerCreate: async (req, res) => {
    const { nameUser, emailUser, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await User.create({
        name: nameUser,
        email: emailUser,
        password: hashPassword,
      });
      // res.json({ msg: "Data Berhasil Tersimpan" });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      const users = await User.findAll({
        where: {
          email: email,
        },
      });
      // console.log(users[0].password);
      if (users) {
        const checkPassword = await bcrypt.compare(password, users[0].password);
        if (checkPassword) {
          req.session.user = {
            id: users[0].id,
            email: users[0].email,
            name: users[0].name,
            otoritas: users[0].otoritas,
          };
          res.redirect("/dashboard");
        } else {
          req.flash("alertMessage", "password yang anda masukan salah");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", "mohon maaf email atau password anda salah");
        res.redirect("/");
      }
    } catch (error) {
      req.flash("alertMessage", "email tidak terdaftar");
      res.redirect("/");
      console.log(error);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
