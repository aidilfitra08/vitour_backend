const db = require("../models");
const Culture = db.culture;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Image = db.image;


// Create and Save a new Culture
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nama_budaya) {
    res.status(400).send({
      message: "Nama Culture Kosong!"
    });
    return;
  }


  const culture = req.body;
  // Save Tutorial in the database
  await Culture.create(culture)
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
exports.findAll = async (req, res) => {
  if(req.query.filter){
    await Culture.findAll({
      where:{city_id:req.query.filter},
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
            err.message || "Some error occurred while retrieving Cultures."
        });
      });
  } else{
    await Culture.findAll({
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

  await Culture.findAll({
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
exports.update = async (req, res) => {
  const id = req.params.id;

  await Culture.update(req.body, {
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Culture.destroy({
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

