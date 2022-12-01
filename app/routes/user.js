module.exports = app => {
  const user = require("../controllers/auth.js");
  
  var router = require("express").Router();
  const auth  = require("../middleware/auth.js")
  
  // register
  router.post("/register", user.register);
  
  // login
  router.post("/login", user.login);
  
  router.get("/my-profile", auth.webPage, user.getUserProfile);
  router.put("/my-profile", auth.webPage, user.updateProfile);
  router.put("/my-password", auth.webPage, user.updatePassword);

  router.get("/user", auth.adminPage, user.getAllUser);
  router.get("/user/:id", auth.adminPage, user.getUserDetail);
  router.put("/user/:id", auth.adminPage, user.updateUser);
  router.delete("/user/:id", auth.adminPage, user.deleteUser);

  app.use("/api", router);
  };
  
  