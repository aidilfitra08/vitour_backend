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
    user_id = req.user_id_loggedin;
    user_id = user_id.toString();
    var dataOrder = {
        order_id : chargeResponse.order_id,
        user_id : user_id,
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
    let responseMidtrans = statusResponse;
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

exports.findOne = async (req, res) => {
  const id = req.params.id;

  await Order.findAll({
    where: {order_id: id},
  })
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};

exports.detailOrdersWeb = async (req, res) => {
  const id = req.params.id;

  await Order.findOne({
    where: {order_id: id},
  })
    .then(data => {
      data.response_midtrans = JSON.parse(data.response_midtrans)
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id + (err)
      });
    });
};

exports.findOne2 = async (req, res) => {
  const id = req.user_id_loggedin;

  await Order.findAll({
    where: {user_id: id},
  })
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};

exports.findOne3 = async (req, res) => {
  const id = req.params.id;

  await Order.findAll({
    where: {user_id: id},
  })
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Order was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Maybe Marketplace was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + id + " or merchandise not exist!"
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  await Order.destroy({
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Order was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Order with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id
      });
    });
};


