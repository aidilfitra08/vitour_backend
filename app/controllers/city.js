const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new City
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_kota) {
    res.status(400).send({
      message: "Nama Kota Kosong!"
    });
    return;
  }



  const city = req.body;
  // Save Tutorial in the database
  City.create(city)
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
exports.findAll = (req, res) => {
  City.findAll()
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  City.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  City.update(req.body, {
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
exports.delete = (req, res) => {
  const id = req.params.id;

  City.destroy({
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
