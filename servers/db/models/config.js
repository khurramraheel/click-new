let mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/darazee', function (err, connection) {
    mongoose.connect('mongodb://khurram:root123@ds263656.mlab.com:63656/clicky', function (err, connection) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(connection);
    }
});