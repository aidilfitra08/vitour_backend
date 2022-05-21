const db = require("../models");
const VideoVR = db.videovr;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro")

// Create and Save a new Merchandise
exports.create = (req, res) => {
  // Validate request
  if (!req.body.city_id && !req.body.link_video && !req.body.deskripsi && !req.body.durasi) {
    res.status(400).send({
      message: "Request kosong!"
    });
    return;
  }

  // Create a Tutorial
//   const Merchandise = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   };

  const videovr = req.body;
  // Save Tutorial in the database
  VideoVR.create(videovr)
    .then(data => {
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the VideoVR."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  VideoVR.findAll()
    .then(data => {
        response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving VideoVRs."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VideoVR.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving VideoVR with id=" + id
      });
    });
};

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  VideoVR.update(req.body, {
    where: { video_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ 
            status: 200,
            success: true,
            message: "VideoVR was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update VideoVR with id=${id}. Maybe VideoVR was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating VideoVR with id=" + id
      });
    });
};

// // Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VideoVR.destroy({
    where: { video_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
            status: 200,
            success: true,
            message: "VideoVR was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `VideoVR with id=${id} not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VideoVR with id=" + id
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
