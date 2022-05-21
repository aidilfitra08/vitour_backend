const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
// var corsOptions = {
//   origin: "https://vitour-backend.herokuapp.com"
// };

// app.use(cors(corsOptions));
app.use(cors());

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
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
