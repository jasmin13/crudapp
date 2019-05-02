var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var session = require("express-session");
var flash = require("req-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// DB Connection
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect( 
    "mongodb://localhost:27017/user_crud",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connection Successfull"))
  .catch(err => console.error(err));

app.listen(3001, function() {
  console.log("Server is Running on 3001 port");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "thunderbird",
    resave: false,
    saveUninitialized: true
  })
);

app.use(flash);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
