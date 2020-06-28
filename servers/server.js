let http = require("http");
let express = require("express");
let bdy = require("body-parser");
let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let mongoose = require("mongoose");
let Conmongo = require("connect-mongo")(expressSession);
require("./db/models/config");
let User = require("./db/models/UserSchema");
let ProductsInfo = require("./db/models/productSchema");
let passport = require("./authentication");
let userRoutes = require("./routes/router");
let messageRouter = require("./routes/messages");
let productRotuer = require("./routes/products");
var cors = require("cors");
var sockets = require("./Sockets");
let app = express();
app.use(cors());
app.use(bdy.urlencoded());
app.use(bdy.json());

let userController = require("./user-controller/usercontroller");



// io.on("connection", socket => {
//  return console.log("New client connected"), setInterval(() => getApiAndEmit(socket),
//     10000
//   )
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

app.use(cookieParser());
app.use(
  expressSession({
    secret: "cat is walking",
    // store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('./server'));

app.use("/", userRoutes);
app.use("/messages", messageRouter);
app.use("/products",productRotuer);


app.use(express.static("./servers/uploads"));
app.use(express.static("./build"));

const port = process.env.PORT || 1001;
const server = http.createServer(app);

server.listen(port, () => console.log("server is starting at 101"));

sockets(server);
