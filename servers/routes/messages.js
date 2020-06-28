const express = require("express");
const Messages = require("../db/models/Messages");
const Router = express.Router();

Router.route("/").get((req, res, next) => {
  Messages.find({})
    .populate("user", "name")
    .exec((err, messages) => {
      console.log(err);
      if (err) return next(err);
      res.setHeader("content-type", "application/json");
      req.statusCode = 200;
      res.json({
        success: true,
        message: "Inbox fetched successfully",
        messages
      });
    });
});

Router.route("/:user").get((req, res, next) => {
  Messages.findOne({ user: req.params.user }, (err, box) => {
    if (err) return next(err);
    res.setHeader("content-type", "application/json");
    req.statusCode = 200;
    res.json({
      success: true,
      message: "Inbox fetched successfully",
      messages: box ? box.messages : []
    });
  });
});

module.exports = Router;
