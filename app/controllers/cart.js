const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;
const Merchandise = db.merchandise;
const jwt = require('jsonwebtoken');

// Create and Save a new City
exports.create = async (req, res) => {

  // let cart = req.body;
  user_id = req.user_id_loggedin;
  let cart = {
    merchandise_id : req.body.merchandise_id,
    price : req.body.price,
    quantity : req.body.quantity,
    user_id : user_id
  }
  // response.successResponse(res, cart);
  // Save Tutorial in the database
  await Cart.create(cart)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the City."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  if (req.query.filter) {
    if (req.query.type_gambar) {
      await City.findAll({
        where: {nama_kota: req.query.filter},
        include: [{
          model: Image,
          where : {
            type_gambar: req.query.type_gambar
          },
          attributes: ['images_link'],
          require: false
          }]
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
      await City.findAll({
        where: {nama_kota: req.query.filter},
        include: [{
          model: Image,
          attributes: ['images_link'],
          require: false
          }]
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
    }
    
  } else {
    await City.findAll({
      include: [{
        model: Image,
        attributes: ['images_link'],
        require: false
        }]
      
      // include: [{
      //   model: Culinary,
      //   attributes: ['culinary_id'],
      //   require: false
      //   },
      //   {
      //     model: Culture,
      //     attributes: ['culture_id'],
      //     require: false
      //   },
      //   {
      //     model: Destination,
      //     attributes: ['destination_id'],
      //     require: false
      //   },
      //   {
      //     model: Merchandise,
      //     attributes: ['merchandise_id'],
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
            err.message || "Some error occurred while retrieving City."
        });
      });
  }
  
};

// Find a single Tutorial with an id
exports.getCarts = async (req, res) => {
  user_id = req.user_id_loggedin;
  user_id = user_id.toString();
  // const merchId = req.body.merchandise_id;
  // if (!req.query.filter) {
  //   return req.query.filter;
  // }
  await Cart.findAll(
    {
      where: {user_id: user_id},
      include: [
      {
        model: Merchandise,
        attributes: ['nama_merchandise', 'price','variant',],
        include: [{
          model: Image,
          attributes: ['images_link'],
          require: false
          }]
      }]
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
      // ],
      }
  )
    .then(data => {
      let data_output = []
      // for (const key in data) {
      //   let cart_item = {
      //     cart_id : data[key].cart_id,
      //     merchandise_id : data[key].merchandise_id,
      //     nama_merchandise : data[key].merchandise.nama_merchandise,
      //     price : data[key].price,
      //     variant : data[key].merchandise.variant,
      //     quantity : data[key].quantity,
      //     image_link : data[key].merchandise.image_link
      //   };
      // }
      let sub_total_items = 0
      for (let index = 0; index < data.length; index++) {
        data_output[index] = {
          cart_id : data[index].cart_id,
          merchandise_id : data[index].merchandise_id,
          nama_merchandise : data[index].merchandise.nama_merchandise,
          price : data[index].price,
          variant : data[index].merchandise.variant,
          quantity : data[index].quantity,
          image_link : data[index].merchandise.images[0].images_link,
          subtotal_price_item : data[index].price * data[index].quantity
        }

        sub_total_items += data_output[index].subtotal_price_item;

      }

      let output = {
        sub_total_price : sub_total_items,
        cart_item : data_output
      }
      // const output = {
      //   cart_id : data.cart_id,
      //   merchandise_id : data.merchandise_id,
      //   nama_merchandise : data.merchandise.nama_merchandise,
      //   price : data.price,
      //   variant : data.merchandise.variant,
      //   quantity : data.quantity,
      //   image_link : data.merchandise.image_link
      // };
      response.successResponse(res, data);
      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with user_id=" + err
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  await City.update(req.body, {
    where: { city_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "City was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update City with id=${id}. Maybe City was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating City with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.deleteItem = async (req, res) => {
  const id = req.params.cart_id;

  await Cart.destroy({
    where: { cart_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "cart was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `cart with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cart with id=" + id
      });
    });
};
