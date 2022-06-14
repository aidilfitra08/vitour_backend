const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
// const {isSignedIn}=require("./app/controllers/auth");

app.set('secretKey', process.env.SECRET_KEY);

dotenv.config();

//Local
// var corsOptions = {
//   origin: [
//     'http://localhost:3004',  // admin website
//     'http://localhost:3000',  // main website
//   ],
//   credentials: false,
// };

//Online
var corsOptions = {
  origin: [
    'https://vitour-crud.vercel.app',  // admin website
    'https://vitour.herokuapp.com/',  // main website
    'http://localhost:3004',  // admin website
    'http://localhost:3000',
    'http://vitour.herokuapp.com/',
  ],
  credentials: true
};

app.use(cors(corsOptions));
// app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend Vitour" });
});

//routes
require("./app/routes/turorial.routes")(app);
require("./app/routes/city")(app);
require("./app/routes/culinary")(app);
require("./app/routes/culture")(app);
require("./app/routes/image")(app);
require("./app/routes/marketplace")(app);
require("./app/routes/destination")(app);
require("./app/routes/merchandise")(app);
require("./app/routes/videovr")(app);
require("./app/routes/searchbar")(app);
var adminRoutes = require("./app/routes/admin");

app.use("/api", adminRoutes);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
     err.status = 404;
     next(err);
 });
 // handle errors
 app.use(function(err, req, res, next) {
  console.log(err);
  
   if(err.status === 404)
    res.status(404).json({message: "Not found"});
   else 
     res.status(500).json({message: "Something looks wrong :( !!!"});
 });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
