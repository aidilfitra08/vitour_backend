const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;
const response = require("../../helper/macro");
const Culinary = db.culinary;
const Culture = db.culture;
const Destination = db.destination;
const Merchandise = db.merchandise;
const Marketplace = db.marketplace;
const Image = db.image;
const Videovr = db.videovr;

exports.search = async (req, res) => {
    // Validate request
  if (!req.query.keyword) {
    res.status(400).send({
      message: "Keyword kosong!"
    });
    return;
  }
    
  var keyword = req.query.keyword;
  words = keyword.split(" ");
  

  try {
    //tabel city
    data = await City.findAll({
      where: {
        [Op.or]:{
          nama_kota: 
          {
            [Op.or]:[
              {[Op.iLike]: `%${words[0]}%`},
              {[Op.iLike]: `%${words[1]}%`},
              {[Op.iLike]: `%${words[2]}%`},
              {[Op.iLike]: `%${words[3]}%`},
              {[Op.iLike]: `%${words[4]}%`},
              {[Op.iLike]:{[Op.any]: words}},
            ] ,
          }
        }
        
        
      },
    });

    // tabel kuliner
    data2 = await Culinary.findAll({
      where: {
        [Op.or]:{
          nama_kuliner: 
          {
            [Op.or]:[
              {[Op.iLike]: `%${words[0]}%`},
              {[Op.iLike]: `%${words[1]}%`},
              {[Op.iLike]: `%${words[2]}%`},
              {[Op.iLike]: `%${words[3]}%`},
              {[Op.iLike]: `%${words[4]}%`},
              {[Op.iLike]:{[Op.any]: words}},
            ] ,
          }
        }
      },
    });

    if (data2 != null) {
      for (let index = 0; index < data2.length; index++) {
        // const element = array[index];
        data.push(data2[index]);
      }
    }
    
    //tabel culture
    data3 = await Culture.findAll({
      where: {
        [Op.or]:{
          nama_budaya: 
          {
            [Op.or]:[
              {[Op.iLike]: `%${words[0]}%`},
              {[Op.iLike]: `%${words[1]}%`},
              {[Op.iLike]: `%${words[2]}%`},
              {[Op.iLike]: `%${words[3]}%`},
              {[Op.iLike]: `%${words[4]}%`},
              {[Op.iLike]:{[Op.any]: words}},
            ] ,
          }
        }
      },
    });
    
    if (data3 != null) {
      for (let index = 0; index < data3.length; index++) {
        // const element = array[index];
        data.push(data3[index]);
      }
    }

    //tabel destination
    data4 = await Destination.findAll({
      where: {
        [Op.or]:{
          nama_destinasi: 
          {
            [Op.or]:[
              {[Op.iLike]: `%${words[0]}%`},
              {[Op.iLike]: `%${words[1]}%`},
              {[Op.iLike]: `%${words[2]}%`},
              {[Op.iLike]: `%${words[3]}%`},
              {[Op.iLike]: `%${words[4]}%`},
              {[Op.iLike]:{[Op.any]: words}},
            ] ,
          }
        }
      },
    });
    
    if (data4 != null) {
      for (let index = 0; index < data4.length; index++) {
        // const element = array[index];
        data.push(data4[index]);
      }
    }

    //tabel merchandise
    data5 = await Merchandise.findAll({
      where: {
        [Op.or]:{
          nama_merchandise: 
          {
            [Op.or]:[
              {[Op.iLike]: `%${words[0]}%`},
              {[Op.iLike]: `%${words[1]}%`},
              {[Op.iLike]: `%${words[2]}%`},
              {[Op.iLike]: `%${words[3]}%`},
              {[Op.iLike]: `%${words[4]}%`},
              {[Op.iLike]:{[Op.any]: words}},
            ] ,
          }
        }
      },
    });
    
    if (data5 != null) {
      for (let index = 0; index < data5.length; index++) {
        // const element = array[index];
        data.push(data5[index]);
      }
    }
    
    res.status(200).send({
      status: 200,
      success: true,
      data: data
    });
  
  // res.status(400).send("Invalid Credentials");
    } catch (err) {
        res.status(500).send({
        message:
          err.message || "Some error occurred while search."
        });
    }
  };