var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");

var db = require("./database/database");
var syncData = require("./app/home/model");

var indexRouter = require("./app/home/route");
var drawRouter = require("./app/draw/route");
var dashboardRouter = require("./app/dashboard/route");
var loginRouter = require("./app/login/route");
var userRouter = require("./app/user/route");
var eventRouter = require("./app/event/route");
var doorprizeRouter = require("./app/doorprize/route");
var participantRouter = require("./app/participant/route");

var app = express();

global.__basedir = __dirname + "/..";

// view engine setup
app.use(
  session({
    secret: "Salman Ganteng Banget",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000,
    },
  })
);
app.use(flash());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect database
try {
  db.authenticate();
  console.log("Koneksi Berhasil!");
  //untuk migrations
  // syncData.sync();
} catch (error) {
  console.log(error);
}

app.use("/participant", participantRouter);
app.use("/doorprize", doorprizeRouter);
app.use("/events", eventRouter);
app.use("/event", indexRouter);
app.use("/dashboard", dashboardRouter);
app.use("/draw", drawRouter);
app.use("/", loginRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
