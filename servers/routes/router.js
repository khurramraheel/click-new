let express = require("express");
let router = express.Router();
let userController = require("../user-controller/usercontroller")
  .userController;
let productController = require("../user-controller/usercontroller")
  .productController;
let checkoutController = require("../user-controller/usercontroller")
  .checkoutController;
let passport = require("../authentication");
let multer = require("multer");
let bodyParser = require("body-parser");
let Productinfo = require("../db/models/productSchema");
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const SendMail = require("../sendMail");

const totalItems = items => {
  let qan = 0;
  console.log(items);
  items.forEach(p => {
    qan = qan + p.quantity;
  });
  return qan;
};

const totalPrice = items => {
  let price = 0;
  items.forEach(p => {
    price = price + p.price * p.quantity;
  });
  return price;
};

let storageconf = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, require("path").resolve(__dirname, "../uploads/static"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
let conf = multer({ storage: storageconf });

router.post("/checklogin", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user || {});
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    success: true
  });
});

router.post("/uploads", conf.single("file"), function(req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  newBody.file = "/static/" + req.file.originalname;
  productController.saveData(newBody, function(err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true,user:user });
    }
  });
});
router.post("/signup", function(req, res) {
  console.log(req.body);
  userController.signup(req.body, function(err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

router.post("/purchase", function(req, res, next) {
    console.log(req.isAuthenticated())
  console.log(req.user);
  let purchaseInfo = {
    userid: req.body.user._id,
    products: req.body.cart
  };
  checkoutController.purchase(purchaseInfo, function(err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      const to = "ars3753669@gmail.com";
      let cartTable = req.body.cart.map(item => {
        return `<tr><td>${item.description}</td><td>${item.quantity}</td><td>${
          item.price
        }</td></tr>`;
      });

      const body = `<h2>User Email : ${req.body.user.email}</h2>
                 <h3>User Name : ${req.body.user.username}</h3>
                 <h2>Cart Information</h2>
                 <table border='1'>
                 <thead><tr><th>Product Name</th><th>Quantity</th><th>Price</th></tr></thead>
                 <tbody>${cartTable.join("")}</tbody>
                 </table>
                 <h3>Total Items : ${totalItems(req.body.cart)}</h3>
                 <h3>Total Price : ${totalPrice(req.body.cart)}</h3>
  `;
      SendMail(to, "Order Confirmation", body, res, next);
    }
  });
});

router.post("/signin", function(req, resp, next) {
  console.log(req.body);
  passport.authenticate("local", function(err, user) {
    if (user) {
      req.login(user, user => {
        resp.json(req.user);
      });
    } else {
      resp.json({ success: false });
    }
  })(req, resp, next);
});
router.get("/showProduct", function(req, res) {
  Productinfo.find({}, function(err, productInfo) {
    if (err) {
      res.send(500);
    } else {
      res.json(productInfo);
    }
  });
});

// router.use(express.static('../../uploads'))
module.exports = router;
