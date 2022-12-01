const db = require("../models");
const response = require("../../helper/macro");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { STRING } = require("sequelize");
const { restart } = require("nodemon");

// Create and Save a new user
exports.register = async (req, res) => {
  // Validate request
  try {
    // Get user input
    const { name, email, password,} = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ where: { email: email } });
    // console.log(oldUser);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    var encryptedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(encryptedPassword);
    // Create user in our database
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      role: "user",
    });

    // Create token
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );
    // // save user token
    // user.token = token;
    // data = {
    //     name : user.name,
    //     email : user.email
    // }
    // return new user
    res.status(201).send({
      status: 201,
      success: true,
      message: "user registered"
    });
    // res.status(201).json(user);
  } catch (err) {
    res.status(500).send({
        message:
          err.message || "Some error occurred while register."
    });
  }
};

exports.login = async (req, res) => {
    // Validate request
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ where: { email: email } });
        if(!user){
          res.status(400).send({
            status: 400,
            success: false,
            message: "email haven't registered yet",
          });
        }
    
        if (user && (await bcrypt.compare(password, user.password))) {
           const token = jwt.sign(
            { user_id: user.user_id, email, role:user.role},
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          // user.token = token;
          data = {
            name : user.name,
            email : user.email,
            token : token,
            role: user.role
          }
          // user
          res.status(200).send({
            status: 200,
            success: true,
            message: "user login",
            data: data
          });
        } else {
          res.status(400).send({
            status:400,
            success:false,
            message:"Wrong Password"
          });
        }
    } catch (err) {
        res.status(500).send({
        message: 
          err.message || "Some error occurred while login."
        });
    }
};

// exports.isSignedIn=expressjwt({
//   secret:process.env.SECRET_KEY,
//   userProperty:"auth",
//   algorithms: ['HS256'],
// })


// // Find User Profile
exports.getUserProfile = async (req, res) => {
  // const id = req.params.id;
  let user_id = req.user_id_loggedin;
  user_id = user_id.toString();
  await User.findOne({
    attributes: ['name', 'email', 'handphone', 'address', 'prof_pic_link'],
    where : {user_id: user_id}
  })
    .then(data => {
      // res.send(data)
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id
      });
    });
};

// // Update user profile
exports.updateProfile = async (req, res) => {
  let user_id = req.user_id_loggedin;
  user_id = user_id.toString();

  await User.update(req.body, {
    where: { user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id
      });
    });
};

exports.updatePassword = async (req, res) => {
  let user_id = req.user_id_loggedin;
  user_id = user_id.toString();

  let encryptedPassword = await bcrypt.hash(req.body.password, 10);
  let update_form = {
    password : encryptedPassword
  }
  await User.update(update_form, {
    where: { user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Password was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Password with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Password with user_id=" + id
      });
    });
};

/*
  Admin API
*/

// Get all registered user data
exports.getAllUser = (req, res) => {

  User.findAll({
    attributes: ['user_id', 'name', 'email', 'role', 'address', 'handphone', 'prof_pic_link']
  })
    .then(data => {
      res.status(200).send({
        status: 200,
        success: true,
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all user data."
      });
    });
};

// // Find User Profile
exports.getUserDetail = async (req, res) => {
  const id = req.params.id;
  // let user_id = req.user_id_loggedin;
  // user_id = user_id.toString();
  await User.findOne({
    attributes: ['user_id', 'name', 'email', 'role', 'address', 'handphone', 'prof_pic_link'],
    where : {user_id: id}
  })
    .then(data => {
      // res.send(data)
      response.successResponse(res, data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user detail with id=" + id
      });
    });
};

// // Update user profile
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  await User.update(req.body, {
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// // Delete a user with the specified id in the request
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  await User.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};