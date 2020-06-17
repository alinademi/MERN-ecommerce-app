const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

// if there is user is in the route as parameter,
// then run userById and populate the user and add product
router.param("userId", userById);

module.exports = router;