module.exports = app => {
    const culinary = require("../controllers/culinary.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", culinary.create);
  
    // Retrieve all culinary
    router.get("/", culinary.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", culinary.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", culinary.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", culinary.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/culinaries", router);
  };
  