var express = require("express");
const { otoritas, isLogin } = require("../../middleware/auth");
var router = express.Router();
const {
  index,
  datatable,
  create,
  update,
  deleteData,
  Detail,
} = require("./controller");

/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/getdata", datatable);
router.post("/detail", Detail);
router.post("/create", create);
router.post("/update", update);
router.post("/delete", deleteData);

module.exports = router;
