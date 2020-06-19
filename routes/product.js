const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//Route for getting one product by id /////
//
router.get("/product/:productId", read);

//Route for creating a product /////
//
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//Route for deleting a product /////
//
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

//Route for updating a product /////
//
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// get all products
//
router.get("/products", list);

// if there is user is in the route as parameter,
// then run userById and populate the user and add product
router.param("userId", userById);

router.param("productId", productById);

module.exports = router;
