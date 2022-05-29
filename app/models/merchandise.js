'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchandise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.city.hasMany(Merchandise, {
        foreignKey: 'city_id'
      });
      Merchandise.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Merchandise.init({
    merchandise_id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    city_id : {
      type: DataTypes.INTEGER,
      references: {
        model: 'cities',
        key: 'city_id',
        as: 'city_id'
      }
    },
    nama_merchandise: DataTypes.STRING,
    deskripsi_merchandise: DataTypes.TEXT,
    alamat_toko: DataTypes.STRING,
    id_alamat_marketplace: DataTypes.INTEGER,
    koordinat_toko: DataTypes.STRING,
    merchandise_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'merchandise',
  });
  return Merchandise;
};