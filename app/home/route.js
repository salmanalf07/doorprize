var express = require("express");
var router = express.Router();
const { index, draw } = require("./contoller");

/* GET home page. */
router.get("/(:event)", index);
// router.post("/(:event)", draw);

module.exports = router;
