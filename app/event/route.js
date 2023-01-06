var express = require("express");
const { otoritas, isLogin } = require("../../middleware/auth");
var router = express.Router();
const {
  index,
  datatable,
  eventDetail,
  eventCreate,
  eventUpdate,
  eventDelete,
  eventReport,
  eventTemplate,
} = require("./controller");

/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/getevent", datatable);
router.post("/eventDetail", eventDetail);
router.post("/create", eventCreate);
router.post("/update", eventUpdate);
router.post("/delete", eventDelete);
router.get("/report/(:event)", eventReport);
router.get("/template/(:event)", eventTemplate);

module.exports = router;
