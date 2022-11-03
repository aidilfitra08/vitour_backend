const db = require("../models");
const Destination = db.destination;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const videovr = require("../routes/videovr");
const Image = db.image;
const Videovr = db.videovr;

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_destinasi) {
    res.status(400).send({
      message: "Nama Destination Kosong!"
    });
    return;
  }

  const destination = req.body;
  // Save Tutorial in the database
  Destination.create(destination)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Destination."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Destination.findAll({
      include: [{
        model: Image,
        attributes: ['images_link'],
        require: false
        },
      {
        model:Videovr,
        attributes:['link_video'],
        require:false
      }]

  })
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Destinations."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Destination.findAll({
    where: {destination_id: id},
      include: [{
        model: Image,
        attributes: ['images_link'],
        require: false
        },
        {
          model:Videovr,
          attributes:['link_video'],
          require:false
        }
      ]
  })
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Destination with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Destination.update(req.body, {
    where: { destination_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Destination was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Destination with id=${id}. Maybe Destination was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Destination with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Destination.destroy({
    where: { destination_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Destination was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Destination with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Destination with id=" + id
      });
    });
};


