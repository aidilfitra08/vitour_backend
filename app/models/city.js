'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  City.init({
    city_id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_kota: {
      type: DataTypes.STRING
    },
    informasi_kota: {
      type: DataTypes.TEXT
    },
    koordinat_kota: {
      type: DataTypes.STRING
    },
    email_dinas_pariwisata_kota: {
      type: DataTypes.STRING(50)
    },
    culinary_id: {
      type: DataTypes.ARRAY
    },
    culture_id: {
      type: DataTypes.ARRAY
    },
    destination_id: {
      type: DataTypes.ARRAY
    },
    merchandise_id_all: {
      type: DataTypes.ARRAY
    },
    videovr_id: {
      type: DataTypes.ARRAY
    }
  }, {
    sequelize,
    modelName: 'city',
  });
  return City;
};