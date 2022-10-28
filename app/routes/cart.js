module.exports = app => {
    
    const router = require("express").Router();
    const cart = require("../controllers/cart.js")
    const cartauth  = require("../middleware/cartauth.js")
    const auth  = require("../middleware/auth.js")
    
    router.post("/", cartauth, cart.create);
    
    // // Retrieve all city
    // router.get("/", city.findAll);
    // get cart items
    router.get("/",cartauth,cart.getCarts);
    
    // // add item to cart
    // router.route("/add",cartauth,cart.addItem);
    
    // // delete item from cart
    // router.route("/delete",cartauth,cart.deleteItem);
    
    // // increment item quantity
    // router.route("/increment",cartauth,cart.increaseItemQuantity);
    
    // // decrement item quantity
    // router.route("/decrement",cartauth,cart.decreaseItemQuantity);
    
    app.use("/api/cart", router);
};
