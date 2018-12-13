const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// models
const { User } = require("./models/User");

// Middlewares
const { auth } = require("./middleware/auth");

const app = express();
const Port = process.env.PORT || 4000;
require("dotenv").config();

mongoose.connect(
  process.env.DATABASE1,
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database is Connected");
    }
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes

app.get("/getRoute", (req, res) => {
  res.json({ Hi: "hello" });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/signup", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      res.status(200).json({
        success: true,
        userData: doc
      });
    }
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "auth Failed,  email Not Found"
      });
    user.comparePassword(req.body.password, (err, isMatched) => {
      if (!isMatched)
        return res.json({ loginSuccess: false, message: "Wrong Password" });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("my_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.listen(Port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running on port ${Port}`);
  }
});
