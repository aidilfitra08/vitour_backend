'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marketplace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Marketplace.init({
    id_alamat_marketplace: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    whatsapp: DataTypes.STRING,
    facebook: DataTypes.STRING,
    shopee: DataTypes.STRING,
    tokopedia: DataTypes.STRING,
    bukalapak: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'marketplace',
  });
  return Marketplace;
};