module.exports = app => {
    const image = require("../controllers/image.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", image.create);
  
    // Retrieve all image
    router.get("/", image.findAllCityImages);
    router.get("/", image.findAllCulinaryImages);
    router.get("/", image.findAllCultureImages);
    router.get("/", image.findAllDestinationImages);
    router.get("/", image.findAllMerchandiseImages);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    router.get("/:id", image.findOne);
  
    // // // Update a Tutorial with id
    router.put("/:id", image.update);
  
    // // // Delete a Tutorial with id
    router.delete("/:id", image.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/images", router);
  };
  