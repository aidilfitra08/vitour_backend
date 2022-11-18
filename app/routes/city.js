module.exports = app => {
    // Import Controllers
    const city = require("../controllers/city.js");
    // const auth = require('../middleware/auth');

    // Import Middleware
    const auth  = require("../middleware/auth.js")
    var router = require("express").Router();
  
    // Create a new City
    router.post("/", auth.adminPage, city.create);

    // Retrieve all city
    router.get("/", city.findAll);
  
    // // Retrieve a single City with id
    router.get("/:id", city.findOne);

    // // Retrieve a single City with city_name
    router.get("/name/:id", city.getCityByName);
  
    // // Update a City with id
    router.put("/:id", auth.adminPage, city.update);

    // // Delete a City with id
    router.delete("/:id", auth.adminPage, city.delete);

    //Create, update, delete city with authorization
    // router.post("/", auth, city.create);
    // router.put("/:id", auth, city.update);
    // router.delete("/:id", auth, city.delete);
  
    // // Delete all Citys
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/cities", router);
  };
  