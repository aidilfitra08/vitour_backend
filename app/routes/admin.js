// module.exports = router => {
    const admin = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // register
    router.post("/register", admin.register);
  
    // login
    router.post("/login", admin.login);

    module.exports = router;
    // app.use("/api", router);
  // };
  