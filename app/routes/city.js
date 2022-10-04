module.exports = app => {
    const city = require("../controllers/city.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new City
    router.post("/", city.create);

    // Retrieve all city
    router.get("/", city.findAll);
  
    // // Retrieve a single City with id
    router.get("/:id", city.findOne);
  
    // // Update a City with id
    router.put("/:id", city.update);

    // // Delete a City with id
    router.delete("/:id", city.delete);

    //Create, update, delete city with authorization
    // router.post("/", auth, city.create);
    // router.put("/:id", auth, city.update);
    // router.delete("/:id", auth, city.delete);
  
    // // Delete all Citys
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/cities", router);
  };
  