const User = require("../models/userModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    // setting these two as undefined to avoid showing sensible data in response body
    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({
      user,
    });
  });
};
