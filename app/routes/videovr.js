module.exports = app => {
    // Import Controllers
    const videovr = require("../controllers/videovr.js");

    // Import Middleware
    const auth  = require("../middleware/auth.js")
  
    var router = require("express").Router();
  
    // Create a new VideoVR
    router.post("/", auth, videovr.create);
  
    // Retrieve all videovr
    router.get("/", videovr.findAll);
  
    // // Retrieve a single VideoVR with id
    router.get("/:id", videovr.findOne);
  
    // // Update a VideoVR with id
    router.put("/:id", auth, videovr.update);
  
    // // Delete a VideoVR with id
    router.delete("/:id", auth, videovr.delete);

    //Create, update, delete videovr with authorization
    // router.post("/", auth, videovr.create);
    // router.put("/:id", auth, videovr.update);
    // router.delete("/:id", auth, videovr.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/city/videovrs", router);
  };
  