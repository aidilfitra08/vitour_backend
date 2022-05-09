const db = require("../models");
const Merchandise = db.merchandise;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Merchandise
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_merchandise) {
    res.status(400).send({
      message: "Nama Merchandise Kosong!"
    });
    return;
  }

  // Create a Tutorial
//   const Merchandise = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   };

  const merchandise = req.body;
  // Save Tutorial in the database
  Merchandise.create(merchandise)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Merchandise."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Merchandise.findAll()
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Merchandises."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Merchandise.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Merchandise with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Merchandise.update(req.body, {
    where: { merchandise_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Merchandise was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Merchandise with id=${id}. Maybe Merchandise was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Merchandise with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Merchandise.destroy({
    where: { merchandise_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Merchandise was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Merchandise with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Merchandise with id=" + id
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