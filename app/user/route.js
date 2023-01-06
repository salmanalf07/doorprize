var express = require("express");
var router = express.Router();
const {
  userDetail,
  userCreate,
  userUpdate,
  userDelete,
  index,
  datatable,
} = require("./controller");
const { isLogin, otoritas } = require("../../middleware/auth");

router.use(otoritas, isLogin);
router.get("/", index);
router.get("/getuser", datatable);
router.post("/userDetail", userDetail);
router.post("/create", userCreate);
router.post("/update", userUpdate);
router.post("/delete", userDelete);

module.exports = router;
