const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //signed token generator
const expressJwt = require("express-jwt"); // auth check

const { errorHandler } = require("../helpers/dbErrorHandler");

// signup method /////
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

// signin method //////
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

// signout method /////

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "You have successfully signed out" });
};

// forcing signin to access routes /////

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

// auth method to limit access for users to only their own profile
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

// auth method for admin (role one) to prevent access of other users to admin resources
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};