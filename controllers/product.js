const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/productModel");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { error } = require("console");

// method to get a product by id /////
//
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

// method for sending product data to frontend /////
//
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// method for adding a product /////
//
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  //parse the request
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // Validate form fields before creating product
    //(grab the following properties from form fields)
    const { name, description, price, category, quantity, shipping } = fields;
    //check if the fields are empty
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // if the form data passes validation then go ahead and create the product
    let product = new Product(fields); //handles form field data such as name, desc etc...

    if (files.photo) {
      // sets a limit on the size of image to upload
      if (files.photo.size > 512000) {
        return res.status(400).json({
          error: "Image size cannot not be bigger than 512 kb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path); //handles image data from form
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

// method for deleting a product /////
//
exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return (
        res,
        status(400).json({
          error: errorHandler(err),
        })
      );
    }

    res.json({
      message: "Product has been successfully removed",
    });
  });
};

// method for updating a product /////
//
exports.update = (req, res) => {
  let form = new formidable.IncomingForm(); // get incoming form data
  form.keepExtensions = true;
  //parse the request
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // Validate form fields before updating the product
    //(grab the following properties from form fields)
    const { name, description, price, category, quantity, shipping } = fields;
    //check if the fields are empty
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // if the form data passes validation then go ahead and edit(update) the product
    let product = req.product; //go ahead and replace product info with the new info from form
    //by using extend method form lodash library
    product = _.extend(product, fields);

    if (files.photo) {
      // sets a limit on the size of image to upload
      if (files.photo.size > 512000) {
        return res.status(400).json({
          error: "Image size cannot not be bigger than 512 kb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path); //handles image data from form
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
