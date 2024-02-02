const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(409)
          .json({ message: "Email address already in use" });
      }

      bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
          return res.status(500).json({ error: err });
        }

        let user = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          businessName: req.body.businessName,
          password: hashedPass,
          userType: req.body.userType,
        });

        user
          .save()
          .then((user) => {
            res.status(201).json({
              user,
              message: "User Added Successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "An error occurred!",
              error,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred!",
        error,
      });
    });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ $or: [{ email: email }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              userType: user.userType,
            },
            "verySecretValue"
          );
          res.json({
            user,
            message: "Login successful",
            token,
          });
        } else {
          res.json({
            message: "Password is not correct",
          });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  });
};

module.exports = {
  register,
  login,
};
