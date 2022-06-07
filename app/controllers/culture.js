const db = require("../models");
const Culture = db.culture;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;


// Create and Save a new Culture
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_budaya) {
    res.status(400).send({
      message: "Nama Culture Kosong!"
    });
    return;
  }


  const culture = req.body;
  // Save Tutorial in the database
  Culture.create(culture)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Culture."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Culture.findAll({
    include: [{
      model: Image,
      attributes: ['images_link'],
      require: false
      }
    ]
  })
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cultures."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Culture.findAll({
    where: {culture_id: id},
    include: [{
      model: Image,
      attributes: ['images_link'],
      require: false
      }
    ]
  })
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Culture with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Culture.update(req.body, {
    where: { culture_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Culture was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Culture with id=${id}. Maybe Culture was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Culture with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Culture.destroy({
    where: { culture_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Culture was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Culture with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Culture with id=" + id
      });
    });
};

