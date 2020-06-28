const express = require("express");
const Router = express.Router();
const Products = require("../db/models/productSchema");

Router.route("/:productId").delete((req, res, next) => {
  Products.findByIdAndDelete(req.params.productId, (err, result) => {
    if (err) return next(err);
    res.setHeader("content-type", "application/json");
    res.statusCode = 200;
    res.json({ success: true, result });
  });
});
module.exports = Router;
