var express = require("express");
var router = express.Router();
const uploadXls = require("../../middleware/upload-xls");
const { index, draw, upload } = require("./contoller");
const { isLogin } = require("../../middleware/auth");

router.use(isLogin);
router.get("/", index);
router.post("/upload", uploadXls.single("file"), upload);

module.exports = router;
