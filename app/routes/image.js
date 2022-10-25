module.exports = app => {
    // Import Controllers
    const image = require("../controllers/image.js");

    // Import Middleware
    const auth  = require("../middleware/auth.js")
  
    var router = require("express").Router();
  
    // Create a new Image
    router.post("/", auth, image.create);
  
    // Retrieve all image
    router.get("/city", image.findAllCityImages);
    router.get("/culinary", image.findAllCulinaryImages);
    router.get("/culture", image.findAllCultureImages);
    router.get("/destination", image.findAllDestinationImages);
    router.get("/merchandise", image.findAllMerchandiseImages);
  
    router.get("/", image.findAll);
  
    // // Retrieve a single Image with id
    router.get("/:id", image.findOne);
  
    // // // Update a Image with id
    router.put("/:id", auth, image.update);
    //
    // // // Delete a Image with id
    router.delete("/:id", auth, image.delete);

    //Create, update, delete image with authorization
    // router.post("/", auth, image.create);
    // router.put("/:id", auth, image.update);
    // router.delete("/:id", auth, image.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/images", router);
  };
  