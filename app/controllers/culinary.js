const db = require("../models");
const Culinary = db.culinary;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;


// Create and Save a new Culture
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nama_kuliner) {
    res.status(400).send({
      message: "Nama Culinary Kosong!"
    });
    return;
  }


  const culinary = req.body;
  // Save Tutorial in the database
  await Culinary.create(culinary)
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
exports.findAll = async (req, res) => {
  if(req.query.filter){
    await Culinary.findAll({
      where:{city_id: req.query.filter},
      include: [{
        model: Image,
        attributes: ['images_link'],
        require: false
      }]
  })
      .then(data => {
          response.successResponse(res, data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Culinarys."
        });
      });
  } else {
    await Culinary.findAll({
        include: [{
        model: Image,
        attributes: ['images_link'],
        require: false
        }]
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

  await Culinary.findAll({
    where: {culinary_id: id},
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
        message: "Error retrieving Culinary with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  await Culinary.update(req.body, {
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Culinary.destroy({
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

