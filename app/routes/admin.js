module.exports = app => {
    const admin = require("../controllers/admin.js");
  
    var router = require("express").Router();
  
    // register
    router.post("/register", admin.register);
  
    // login
    router.post("/login", admin.login);

  
    app.use("/api", router);
  };
  