module.exports = app => {
    // Import Controllers
    const merchandise = require("../controllers/merchandise.js");

    // Import Middleware
    const auth  = require("../middleware/auth.js")
  
    var router = require("express").Router();
  
    // Create a new Marketplace
    router.post("/", auth, merchandise.create);
  
    // Retrieve all merchandise
    router.get("/", merchandise.findAll);
  
    // // Retrieve a single Marketplace with id
    router.get("/:id", merchandise.findOne);
  
    // // Update a Marketplace with id
    router.put("/:id", auth,merchandise.update);
  
    // // Delete a Marketplace with id
    router.delete("/:id", auth, merchandise.delete);

    //Create, update, delete marketplace with authorization
    // router.post("/", auth, marketplace.create);
    // router.put("/:id", auth, marketplace.update);
    // router.delete("/:id", auth, marketplace.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/merchandises", router);
  };
  