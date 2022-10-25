const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const marketplace = require("../routes/marketplace");
const Culinary = db.culinary;
const Culture = db.culture;
const Destination = db.destination;
const Merchandise = db.merchandise;
const Marketplace = db.marketplace;
const Image = db.image;
const Videovr = db.videovr;

// Create and Save a new City
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nama_kota) {
    res.status(400).send({
      message: "Nama Kota Kosong!"
    });
    return;
  }

  const city = req.body;
  // Save Tutorial in the database
  await City.create(city)
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
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
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
exports.findOne = async (req, res) => {
  const id = req.params.id;
  // if (!req.query.filter) {
  //   return req.query.filter;
  // }

  await City.findOne(
    {
      where: {
        city_id: id
      },
      // include: [{
      //   model: Culinary,
      //   attributes: ['culinary_id', 'nama_kuliner'],
      //   require: false
      //   },
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
        message: "Error retrieving City with id=" + id
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
