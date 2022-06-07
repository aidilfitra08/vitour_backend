const db = require("../models");
const Marketplace = db.marketplace;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Marketplace
exports.create = (req, res) => {
  // Validate request

  const marketplace = req.body;
  // Save Tutorial in the database
  Marketplace.create(marketplace)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Marketplace."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Marketplace.findAll()
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Marketplaces."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Marketplace.findByPk(id)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Marketplace with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Marketplace.update(req.body, {
    where: { marketplace_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Marketplace was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Marketplace with id=${id}. Maybe Marketplace was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Marketplace with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Marketplace.destroy({
    where: { id_alamat_marketplace: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Marketplace was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Marketplace with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Marketplace with id=" + id
      });
    });
};

