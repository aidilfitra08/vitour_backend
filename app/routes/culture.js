module.exports = app => {
    
    // Import Controllers
    const culture = require("../controllers/culture.js");

    // Import Middleware
    const auth  = require("../middleware/auth.js")
  
    var router = require("express").Router();
  
    // Create a new Culture
    router.post("/", auth.adminPage, culture.create);
  
    // Retrieve all culture
    router.get("/", culture.findAll);
  
    // // Retrieve a single Culture with id
    router.get("/:id", culture.findOne);
  
    // // Update a Culture with id
    router.put("/:id", auth.adminPage, culture.update);
  
    // // Delete a Culture with id
    router.delete("/:id", auth.adminPage, culture.delete);

    //Create, update, delete culture with authorization
    // router.post("/", auth, culture.create);
    // router.put("/:id", auth, culture.update);
    // router.delete("/:id", auth, culture.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/cultures", router);
  };
  