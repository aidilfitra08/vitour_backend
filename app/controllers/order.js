const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;
const Merchandise = db.merchandise;
const Order = db.order;
const midtransClient = require('midtrans-client');
const jwt = require('jsonwebtoken');
const { INTEGER } = require("sequelize");

var coreApi = new midtransClient.CoreApi({
isProduction : false,
serverKey : 'SB-Mid-server-GUOyTG9INluP0ZKvjC-MP9_0',
clientKey : 'SB-Mid-client-Ge7_YQoJgeR8a5y6'
});
// Create and Save a new City
exports.create = async (req, res) => {
  var d = new Date();
  let id = d.getHours()+""+d.getMinutes()+""+d.getSeconds()+""+d.getMilliseconds();
  let request = {
    payment_type: req.body.payment_type,
    bank_transfer: {
      bank: req.body.bank
    },
    transaction_details: {
      order_id: id,
      gross_amount: req.body.gross_amount
    },
  }
  coreApi.charge(request).then((chargeResponse)=>{
    var dataOrder = {
        order_id : chargeResponse.order_id,
        user_id : req.body.user_id,
        total_price: req.body.gross_amount,
        response_midtrans:JSON.stringify(chargeResponse),
        status:chargeResponse.transaction_status
    }
    Order.create(dataOrder).then(data=>{
        res.json({
            status:true,
            pesan:"Berhasil Order",
            data:chargeResponse
        });
    }).catch(err=>{
        res.json({
            status:false,
            pesan:"Gagal Order:" + err.message,
            data:[]
         });
    });

  }).catch((e)=>{
    res.json({
        status:false,
        pesan:"Gagal Tampil" + e.message,
        data:[]
    });
  });
}
exports.updateNotifikasi = async (req, res) => {
  // const id = req.params.id;
  coreApi.transaction.notification(req.body)
  .then((statusResponse)=>{
    let orderId = statusResponse.order_id;
    let responseMidtrans = JSON.stringify(statusResponse);
    Order.update({
      response_midtrans:responseMidtrans,
      status:statusResponse.transaction_status
    },{
      where:{order_id:orderId}
    }).then(()=>{
      res.json({
        status:true,
        pesan:"Berhasil Notifikasi",
        data:[]
      });
    }).catch(err =>{
      res.status(500).json({
        status:false,
        pesan: "Gagal Notifikasi",
        data:[]
      });
    });
  });
};


// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  if (req.query.filter) {
    if (req.query.type_gambar) {
      await Order.findAll({
        //   {
        //     model: Culture,
        //     attributes: ['culture_id', 'nama_budaya'],
        //     require: false
        //   },
        //   {
        //     model: Destination,
        //     attributes: ['destination_id', 'nama_destinasi', 'tipe_destinasi'],
        //     require: false
        //   },
        //   {
        //     model: Merchandise,
        //     attributes: ['merchandise_id', 'nama_merchandise','merchandise_type'],
        //     require: false
        //   },
        //   {
        //     model: Image,
        //     attributes: ['images_link'],
        //     require: false
        //   },
        //   {
        //     model: Videovr,
        //     require: false
        //   }
        // ]
      })
        .then(data => {
            response.successResponse(res, data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving city API."
          });
        });
    } else {
      await Order.findAll({
      })
        .then(data => {
            response.successResponse(res, data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving city API."
          });
        });
    }
    
  } else {
    await Order.findAll({
    })
      .then(data => {
          response.successResponse(res, data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving City."
        });
      });
  }
  
};
