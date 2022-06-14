module.exports = app => {
    const marketplace = require("../controllers/marketplace.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new Marketplace
    router.post("/", marketplace.create);
  
    // Retrieve all marketplace
    router.get("/", marketplace.findAll);
  
    // // Retrieve a single Marketplace with id
    router.get("/:id", marketplace.findOne);
  
    // // Update a Marketplace with id
    router.put("/:id", marketplace.update);
  
    // // Delete a Marketplace with id
    router.delete("/:id", marketplace.delete);

    //Create, update, delete marketplace with authorization
    // router.post("/", auth, marketplace.create);
    // router.put("/:id", auth, marketplace.update);
    // router.delete("/:id", auth, marketplace.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/merchandise/marketplace", router);
  };
  