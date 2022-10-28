const db = require("../models");
const Cart = db.cart;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;
const Merchandise = db.merchandise;
const jwt = require('jsonwebtoken');

// Create and Save a new City
exports.create = async (req, res) => {

  const cart = req.body;
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
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  let user_id = decodedToken.user_id;
  user_id = user_id.toString();
  // const merchId = req.body.merchandise_id;
  // if (!req.query.filter) {
  //   return req.query.filter;
  // }
  await Cart.findAll(
    {
      where: {user_id: user_id},
      // include: [
      // {
      //   model: Merchandise,
      //   attributes: ['nama_merchandise', 'price','variant',],
      //   include: [{
      //     model: Image,
      //     attributes: ['images_link'],
      //     require: false
      //     }]
      // }]
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await City.destroy({
    where: { city_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "City was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `City with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete City with id=" + id
      });
    });
};
