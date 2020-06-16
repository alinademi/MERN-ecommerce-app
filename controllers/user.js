const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //signed token generator
const expressJwt = require("express-jwt"); // auth check

const { errorHandler } = require("../helpers/dbErrorHandler");

// signup method
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

// signin method
exports.signin = (req, res) => {
  // find user by email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error:
          "User with the specified email does not exist. Please signup first",
      });
    }
    // if user is found make sure email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};
