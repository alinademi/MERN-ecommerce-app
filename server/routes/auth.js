const express = require("express");
const router = express.Router();

//requiring user controller functions
const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

//signup route /////
router.post("/signup", userSignupValidator, signup);

//signin route /////
router.post("/signin", signin);

//signout route /////
router.get("/signout", signout);

module.exports = router;
