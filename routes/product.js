const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
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

// get all products /////
//
router.get("/products", list);

// get related products /////
//
router.get("/products/related/:productId", listRelated);

// list product categories (only those for products excluding other categories)
//
router.get("/products/categories", listCategories);

//get product photo
//
router.get("/product/photo/:productId", photo);

// list products by search query
//
router.post("/products/by/search", listBySearch); //it's post to be able to access request body and paly with it

// if there is user is in the route as parameter,
// then run userById and populate the user and add product
router.param("userId", userById);

router.param("productId", productById);

module.exports = router;
