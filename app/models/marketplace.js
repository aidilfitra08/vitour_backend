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
      // Marketplace.hasOne(models.merchandise, {
      //   foreignKey: 'marketplace_id'
      // });
      // models.merchandise.belongsTo(Marketplace, {
      //   foreignKey: 'marketplace_id',
      //   onDelete: 'CASCADE'
      // })

      models.merchandise.hasOne(Marketplace, {
        foreignKey: 'merchandise_id'
      });
      Marketplace.belongsTo(models.merchandise, {
        foreignKey: 'merchandise_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Marketplace.init({
    marketplace_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    whatsapp: DataTypes.STRING,
    facebook: DataTypes.STRING,
    shopee: DataTypes.STRING,
    tokopedia: DataTypes.STRING,
    bukalapak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'marketplace',
  });
  return Marketplace;
};