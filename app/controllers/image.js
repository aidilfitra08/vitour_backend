const db = require("../models");
const Image = db.image;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body.reference_id) {
    res.status(400).send({
      message: "reference_id Kosong!"
    });
    return;
  }

  // Create a Tutorial
//   const Image = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   };

  const image = req.body;
  // Save Tutorial in the database
  Image.create(image)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Image."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAllCityImages = (req, res) => {
    if (!req.body.city_id && !req.body.type_gambar) {
        res.status(400).send({
          message: "request Kosong!"
        });
        return;
      }
  Image.findAll({
      where: {
          reference_id : req.body.city_id,
          type_gambar : req.body.type_gambar
        }
  })
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Images."
      });
    });
};

exports.findAllCulinaryImages = (req, res) => {
    if (!req.body.culinary_id && !req.body.type_gambar) {
        res.status(400).send({
          message: "request Kosong!"
        });
        return;
      }
  Image.findAll({
      where: {
          reference_id : req.body.culinary_id,
          type_gambar : req.body.type_gambar
        }
  })
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Images."
      });
    });
};

exports.findAllCultureImages = (req, res) => {
  if (!req.body.culture_id && !req.body.type_gambar) {
      res.status(400).send({
        message: "request Kosong!"
      });
      return;
    }
Image.findAll({
    where: {
        reference_id : req.body.culture_id,
        type_gambar : req.body.type_gambar
      }
})
  .then(data => {
      response.successResponse(res, data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Images."
    });
  });
};

exports.findAllDestinationImages = (req, res) => {
  if (!req.body.destination_id && !req.body.type_gambar) {
      res.status(400).send({
        message: "request Kosong!"
      });
      return;
    }
Image.findAll({
    where: {
        reference_id : req.body.destination_id,
        type_gambar : req.body.type_gambar
      }
})
  .then(data => {
      response.successResponse(res, data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Images."
    });
  });
};

exports.findAllMerchandiseImages = (req, res) => {
  if (!req.body.merchandise_id && !req.body.type_gambar) {
      res.status(400).send({
        message: "request Kosong!"
      });
      return;
    }
Image.findAll({
    where: {
        reference_id : req.body.merchandise_id,
        type_gambar : req.body.type_gambar
      }
})
  .then(data => {
      response.successResponse(res, data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Images."
    });
  });
};


// // Find a single Image with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id
      });
    });
};

// // // Update a Image by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Image.update(req.body, {
    where: { image_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "Image was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Image with id=" + id
      });
    });
};

// // // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.destroy({
    where: { image_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "Image was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Image with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id
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
