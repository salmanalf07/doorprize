var express = require("express");
const { otoritas, isLogin } = require("../../middleware/auth");
var router = express.Router();
const upload = require("../../middleware/upload-xls");
const { index, datatable, deleteData, importExcel } = require("./controller");

/* GET home page. */
router.use(isLogin);
router.get("/", index);
router.get("/getdata", datatable);
router.post("/delete", deleteData);
router.post("/upload", upload.single("file"), importExcel);

module.exports = router;
