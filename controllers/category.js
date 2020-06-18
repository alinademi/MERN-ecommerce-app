const Category = require("../models/categoryModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

// get category by id /////
//
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};

// method for creating new category /////
//
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

// method for sending category data to frontend /////
//
exports.read = (req, res) => {
  return res.json(req.category);
};
