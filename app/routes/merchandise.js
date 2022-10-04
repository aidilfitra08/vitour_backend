module.exports = app => {
    const merchandise = require("../controllers/merchandise.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new Marketplace
    router.post("/", merchandise.create);
  
    // Retrieve all merchandise
    router.get("/", merchandise.findAll);
  
    // // Retrieve a single Marketplace with id
    router.get("/:id", merchandise.findOne);
  
    // // Update a Marketplace with id
    router.put("/:id", merchandise.update);
  
    // // Delete a Marketplace with id
    router.delete("/:id", merchandise.delete);

    //Create, update, delete marketplace with authorization
    // router.post("/", auth, marketplace.create);
    // router.put("/:id", auth, marketplace.update);
    // router.delete("/:id", auth, marketplace.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/merchandises", router);
  };
  