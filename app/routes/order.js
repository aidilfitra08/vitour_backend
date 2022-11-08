module.exports = app => {
    var router = require("express").Router();
    var Order = require('../controllers/order');
    const midtransClient = require('midtrans-client');
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
        router.post('/notifikasi',Order.updateNotifikasi)
        router.get('/', Order.findAll)
        router.post('/charge',Order.create)
        app.use("/api/order", router);
};
