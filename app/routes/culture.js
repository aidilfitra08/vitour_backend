module.exports = app => {
    const culture = require("../controllers/culture.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", culture.create);
  
    // Retrieve all culture
    router.get("/", culture.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", culture.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", culture.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", culture.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/cultures", router);
  };
  