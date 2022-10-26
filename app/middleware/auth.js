const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.admin;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decodedToken.user_id;
    const role = decodedToken.role;

    const user = await User.findOne({ where: user_id });
    if (!user) {
      throw 'Invalid user ID';
    } else {
      if (role == 'admin'){
        next();
      } else{
        throw 'Action does not allowed'
      }
      
    }
  } catch {
    res.status(401).json({
      error: 'User Does Not Allowed to do This Action'
    });
  }
};