module.exports = app => {
  const admin = require("../controllers/auth.js");
  
  var router = require("express").Router();
  
  // register
  router.post("/register", admin.register);
  
  // login
  router.post("/login", admin.login);
  
  app.use("/api", router);
  };
  
  