module.exports = app => {
    const culinary = require("../controllers/culinary.js");
    // const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new Culinary
    router.post("/", culinary.create);
  
    // Retrieve all culinary
    router.get("/", culinary.findAll);
  
    // // Retrieve a single Culinary with id
    router.get("/:id", culinary.findOne);
  
    // // Update a Culinary with id
    router.put("/:id", culinary.update);
  
    // // Delete a Culinary with id
    router.delete("/:id", culinary.delete);

    //Create, update, delete culinary with authorization
    // router.post("/", auth, culinary.create);
    // router.put("/:id", auth, culinary.update);
    // router.delete("/:id", auth, culinary.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/culinaries", router);
  };
  