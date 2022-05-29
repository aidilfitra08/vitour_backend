module.exports = app => {
    const search = require("../controllers/searchbar.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // router.post("/", city.create);
  
    // Retrieve all city
    router.get("/", search.search);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", city.findOne);
  
    // // // Update a Tutorial with id
    // router.put("/:id", city.update);
  
    // // // Delete a Tutorial with id
    // router.delete("/:id", city.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/search", router);
  };
  