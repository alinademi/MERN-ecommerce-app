const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/productModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let product = new Product(fields); //handles form field data such as name, desc etc...

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path); //handles image data from form
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.staus(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
