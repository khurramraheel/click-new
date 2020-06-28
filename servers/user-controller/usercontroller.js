let User = require("../db/models/UserSchema");
let ProductsInfo = require("../db/models/productSchema");
let Purchase = require("../db/models/purchaseSchema");
let userController = {
  signup: (body, next) => {
    let newUser = new User(body);
    newUser.role = "user";
    newUser.save(function(err, user) {
      next(err, user);
    });
  }
};

let productController = {
  saveData: (body, next) => {
    let prdDetail = new ProductsInfo(body);
    prdDetail.save(function(err, user) {
      next(err, user);
    });
  }
};
let checkoutController = {
  purchase: (body, next) => {
    let purchase = new Purchase(body);
    purchase.save(function(err, user) {
      next(err, user);
    });
  }
};

module.exports.userController = userController;
module.exports.productController = productController;
module.exports.checkoutController = checkoutController;
