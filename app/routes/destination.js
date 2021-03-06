module.exports = app => {
    const destination = require("../controllers/destination.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new Destination
    router.post("/", destination.create);
  
    // Retrieve all destination
    router.get("/", destination.findAll);
  
    // // Retrieve a single Destination with id
    router.get("/:id", destination.findOne);
  
    // // Update a Destination with id
    router.put("/:id", destination.update);
  
    // // Delete a Destination with id
    router.delete("/:id", destination.delete);

    //Create, update, delete destination with authorization
    // router.post("/", auth, destination.create);
    // router.put("/:id", auth, destination.update);
    // router.delete("/:id", auth, destination.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/destinations", router);
  };
  