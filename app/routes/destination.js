module.exports = app => {
    const destination = require("../controllers/destination.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", destination.create);
  
    // Retrieve all destination
    router.get("/", destination.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", destination.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", destination.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", destination.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/destinations", router);
  };
  