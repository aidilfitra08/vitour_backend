const db = require("../models");
const Marketplace = db.marketplace;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Marketplace
exports.create = (req, res) => {
  // Validate request
//   if (!req.body.whatsapp) {
//     res.status(400).send({
//       message: "Nama Marketplace Kosong!"
//     });
//     return;
//   }

  // Create a Tutorial
//   const Marketplace = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   };

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
      res.send(data);
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
    where: { marketplace_id: id }
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

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };