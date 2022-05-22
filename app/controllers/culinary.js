const db = require("../models");
const Culinary = db.culinary;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Culture
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_kuliner) {
    res.status(400).send({
      message: "Nama Culinary Kosong!"
    });
    return;
  }


  const culinary = req.body;
  // Save Tutorial in the database
  Culinary.create(culinary)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Culinary."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Culinary.findAll()
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Culinarys."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Culinary.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Culinary with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Culinary.update(req.body, {
    where: { culinary_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Culinary was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Culinary with id=${id}. Maybe Culinary was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Culinary with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Culinary.destroy({
    where: { culinary_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Culinary was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Culinary with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Culinary with id=" + id
      });
    });
};

