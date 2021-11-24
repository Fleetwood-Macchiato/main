require("dotenv").config();

const createError = require("http-errors");
const express = require("express");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth.routes");
const cafesRouter = require("./routes/cafes.routes");
const beansRouter = require("./routes/beans.routes");
const userRouter = require("./routes/user");

const app = express();

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/cafes", cafesRouter);
app.use("/beans", beansRouter);
app.use("/", indexRouter);


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
