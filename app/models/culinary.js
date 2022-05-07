'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Culinary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.city.hasMany(Culinary, {
        foreignKey: 'city_id'
      });
      Culinary.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Culinary.init({
    culinary_id: {
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
    nama_kuliner: DataTypes.STRING,
    deskripsi_kuliner: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'culinary',
  });
  return Culinary;
};