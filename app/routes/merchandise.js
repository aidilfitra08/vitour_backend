module.exports = app => {
    const merchandise = require("../controllers/merchandise.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", merchandise.create);
  
    // Retrieve all merchandise
    router.get("/", merchandise.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", merchandise.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", merchandise.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", merchandise.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/merchandises", router);
  };
  