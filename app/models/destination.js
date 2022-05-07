'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.city.hasMany(Destination, {
        foreignKey: 'city_id'
      });
      Destination.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Destination.init({
    destination_id : {
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
    nama_destinasi: DataTypes.STRING,
    tipe_destinasi: DataTypes.STRING,
    deskripsi_destinasi: DataTypes.TEXT,
    koordinat_destinasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'destination',
  });
  return Destination;
};