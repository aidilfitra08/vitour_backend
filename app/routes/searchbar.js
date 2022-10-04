module.exports = app => {
    const search = require("../controllers/searchbar.js");
  
    var router = require("express").Router();

    router.get("/", search.search);
  
    app.use("/api/search", router);
  };
  