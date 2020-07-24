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
let User = require("../db/models/UserSchema");
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const SendMail = require("../sendMail");
const moment = require('moment');
// const bcrypt = require('bcryo');

let jwtSimple = require('jwt-simple');

let nodemailer = require('nodemailer');


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
  destination: function (req, res, cb) {
    cb(null, require("path").resolve(__dirname, "../uploads/static"));
  },
  filename: function (req, file, cb) {
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

router.post("/uploads", conf.single("file"), function (req, res) {
  let newBody = JSON.parse(JSON.stringify(req.body));
  newBody.file = "/static/" + req.file.originalname;
  productController.saveData(newBody, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, user: user });
    }
  });
});
router.post("/signup", function (req, res) {
  console.log(req.body);
  userController.signup(req.body, function (err, user) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
});

router.post("/purchase", function (req, res, next) {
  console.log(req.isAuthenticated())
  console.log(req.user);
  let purchaseInfo = {
    userid: req.body.user._id,
    products: req.body.cart
  };
  checkoutController.purchase(purchaseInfo, function (err, user) {
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


router.post('/updatePassword', async (req, res) => {

  let token = jwtSimple.decode(req.body.token, "123456");

  try {

    var duration = moment.duration(moment(new Date()).diff(new Date(token.date)));
    var hours = duration.asHours();

    if (hours <= 2) {

      // const salt = await bcrypt.genSalt(10);
      let user = await User.findById(token.userID).select('-password');


      user.password = req.body.password
      await user.save();
      res.json({
        success: true,
        message: "Password updated successfully"
      });

    } else {
      res.json({
        success: false,
        error: "Reset token expired!, please get a new one!"
      });
      return;
    }



  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }


});

router.get('/requestpasssword', async (req, res) => {

  let user;

  try {

    user = await User.findOne({ email: req.query.email });

    if (!user) {


      res.json({
        success: false,
        error: 'Not account found associated with this email'
      });
      return;




      // }
    }

  } catch (err) {

    res.json({
      success: false,
      error: 'Oops, your password cannot be requested right now!'
    });

    return;
  }


  var payload = { date: Date.now(), userID: user._id };

  user.passToken = jwtSimple.encode(payload, "123456");

  try {

    await user.save();


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "mc180201340@vu.edu.pk", // generated ethereal user
        pass: "myNewPass12@" // generated ethereal password
      }
    });

    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Smart Shop', // sender address
        to: req.query.email, // list of receivers
        subject: "Dear user, we have just received a new pasword request for your Smrt Account account assoicated with this email.", // Subject line
        // text: "", // plain text body
        html: "<a href='" + (req.protocol + ':3000//' + req.host + '/resetpassword/' + user.passToken) + "'>Please click here to reset your password</a>" // html body
      });
      res.json({
        success: true,
        error: 'Dear user, please check your email!'
      });

    } catch (err) {

      res.json({
        success: false,
        error: 'Oops, your password cannot be requested right now!'
      });
    }


  } catch (err) {

    res.json({
      success: false,
      error: 'Oops, your password cannot be requested right now!'
    });

  }



});

router.post("/signin", function (req, resp, next) {
  console.log(req.body);
  passport.authenticate("local", function (err, user) {
    if (user) {
      req.login(user, user => {
        resp.json(req.user);
      });
    } else {
      resp.json({ success: false });
    }
  })(req, resp, next);
});
router.get("/showProduct", function (req, res) {
  Productinfo.find({}, function (err, productInfo) {
    if (err) {
      res.send(500);
    } else {
      res.json(productInfo);
    }
  });
});

// router.use(express.static('../../uploads'))
module.exports = router;
