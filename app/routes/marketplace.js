module.exports = app => {
    const marketplace = require("../controllers/marketplace.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", marketplace.create);
  
    // Retrieve all marketplace
    router.get("/", marketplace.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", marketplace.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", marketplace.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", marketplace.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/merchandise/marketplace", router);
  };
  