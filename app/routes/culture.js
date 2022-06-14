module.exports = app => {
    const culture = require("../controllers/culture.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new Culture
    router.post("/", culture.create);
  
    // Retrieve all culture
    router.get("/", culture.findAll);
  
    // // Retrieve a single Culture with id
    router.get("/:id", culture.findOne);
  
    // // Update a Culture with id
    router.put("/:id", culture.update);
  
    // // Delete a Culture with id
    router.delete("/:id", culture.delete);

    //Create, update, delete culture with authorization
    // router.post("/", auth, culture.create);
    // router.put("/:id", auth, culture.update);
    // router.delete("/:id", auth, culture.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/cultures", router);
  };
  