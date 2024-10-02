const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const logger = require("morgan");
const path = require("path");
const htmlRoutes = require("./backend/routes/Routes");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");

app.use(cors());

app.use(compression());

app.use(flash());

app.set("views", __dirname + "/client/views");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "/client/staticfiles")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: { path: "/", maxAge: 1000 * 60 * 60 * 24 },
    secret: "Kaizen",
    saveUninitialized: false,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", htmlRoutes);
mongodb: mongoose
  .connect("mongodb://localhost:27017/vasudev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log(e);
    console.log("No Connection");
  });

app.set("port", process.env.PORT || 3066);

app.listen(app.get("port"), () => {
  console.log("Application running in port: " + app.get("port"));
});

module.exports = app;
