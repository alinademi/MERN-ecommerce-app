const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//Route for getting one category by id /////
//
router.get("/category/:categoryId", read);

//Route for creating a category /////
//
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//Route for updating a category /////
//
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

//Route for deleting a category /////
//
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/categories", list);

// if there is categoryId is in the route as parameter,
// then run categoryById middleware
router.param("categoryId", categoryById);

// if there is userId is in the route as parameter,
// then run userById middleware
router.param("userId", userById);

module.exports = router;
