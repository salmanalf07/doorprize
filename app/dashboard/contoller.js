const Participant = require("../draw/model");
const Sequelize = require("sequelize");
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  index: async (req, res) => {
    try {
      res.render("backend/blank", {
        title: "Door Prize",
        page_name: "Dashboard",
        page_open: "",
        session: req.session.user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  upload: async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path = __basedir + "/public/assets/uploads/" + req.file.filename;
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();
        let tutorials = [];
        rows
          .forEach((row) => {
            Participant.create({ name: row[1] });
          })
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  },
};
