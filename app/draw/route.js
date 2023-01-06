var express = require("express");
var router = express.Router();
const { index, names, save } = require("./contoller");

/* GET home page. */
router.post("/", index);
router.post("/getName", names);
router.post("/save", save);

module.exports = router;
