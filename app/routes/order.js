module.exports = app => {
    var router = require("express").Router();
    var Order = require('../controllers/order');
    const midtransClient = require('midtrans-client');
    const auth  = require("../middleware/auth.js")
    // Create Core Api Instances
    var coreApi = new midtransClient.CoreApi({
        isProduction : false,
        serverKey: 'SB-Mid-server-GUOyTG9INluP0ZKvjC-MP9_0',
        clientKey: 'SB-Mid-client-Ge7_YQoJgeR8a5y6'
    });
    
        // router.get('/',function(req,res,next){
        //     Order.findAll().then(data=>{
        //         res.json({
        //             status:true,
        //             pesan:"Berhasil Tampil",
        //             data:data
        //         });
        //     }).catch(err=>{
        //         res.json({
        //             status:false,
        //             pesan:"Gagal Tampil" + err.message,
        //             data:[]
        //         });
        //     });
        // });
        // Accesed By Midtrans
        router.post('/notifikasi',Order.updateNotifikasi)
        // Retrieve All Orders
        router.get('/',auth.adminPage,Order.findAll)
        // Charge Payment to Midtrans
        router.post('/charge',auth.webPage,Order.create)
        // Retrieve specific order 
        router.get("/:id", auth.webPage,Order.findOne);
        // Update Order
        router.put("/:id",auth.adminPage,Order.update);
        // Delete specific order
        router.delete("/:id", auth.adminPage,Order.delete);
        app.use("/api/order", router);
};
