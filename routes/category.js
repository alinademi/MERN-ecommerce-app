const express = require("express");
const router = express.Router();

const { create, categoryById, read } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

// if there is categoryId is in the route as parameter,
// then run categoryById middleware
router.param("categoryId", categoryById);

// if there is userId is in the route as parameter,
// then run userById middleware
router.param("userId", userById);

module.exports = router;
