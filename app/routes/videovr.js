module.exports = app => {
    const videovr = require("../controllers/videovr.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", videovr.create);
  
    // Retrieve all videovr
    router.get("/", videovr.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", videovr.findOne);
  
    // // Update a Tutorial with id
    router.put("/:id", videovr.update);
  
    // // Delete a Tutorial with id
    router.delete("/:id", videovr.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/videovrs", router);
  };
  