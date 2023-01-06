var express = require("express");
var router = express.Router();
const {
  index,
  register,
  registerCreate,
  logout,
  login,
} = require("./controller");

/* GET home page. */
router.get("/", index);
router.get("/register", register);
router.post("/registerCreate", registerCreate);
router.post("/login", login);
router.get("/logout", logout);
// router.post("/(:event)", draw);

module.exports = router;
