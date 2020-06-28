const User = require("../db/models/UserSchema");

const authenticate = (socket, body, cb) => {
  User.findOne({ email: body.email, password: body.password }, (err, user) => {
    if(err) return  cb(err,false);
    if (user) {
      cb(body, true);
    } else {
      cb(null, false);
    }
  });
};

module.exports = authenticate;
