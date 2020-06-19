const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/productModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

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

//Method to request and sort products based on different parameters /////
//
// sort by sold = /products/?sortBy=sold&order=desc&limit=4
// sort by arrival = /products/?sortBy=createdAt&order=desc&limit=9
// return all products if there are no params in the route

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 9;

  Product.find()
    .select("-photo")
    .populate("category") // this is possible because in the schema model I made category
    //as typeof mongoose object id and refers to category model
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(products);
    });
};

// list related products /////
// find products based on requested product's category
//
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  // find other products excluding self.
  Product.find({ _id: { $ne: req.product }, category: req.product.category }) // $ne means not included in MongoDB
    .limit(limit)
    .populate("category", "_id name") //only populate id and name fields
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json(products);
    });
};

// list product categories (only those for products, excluding other categories)
//
exports.listCategories = (req, res) => {
  // get categories that are distinct from other categories by products
  //https://docs.mongodb.com/manual/reference/method/db.collection.distinct/
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No product categories found",
      });
    }
    res.json(categories);
  });
};

// list products based on search query
//
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip); // for load more request on the frontend
  let findArgs = {}; //set args to empty object to change it later based on request

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  //filter products based on price
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  //perform search baed on the arguments from above method
  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found",
        });
      }
      res.json({
        count: data.length,
        data,
      });
    });
};

// Handle product photo
//
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
