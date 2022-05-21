'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //city
      models.city.hasMany(Image, {
        foreignKey: 'city_id'
      })
      Image.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
      
      //destination
      models.destination.hasMany(Image, {
        foreignKey: 'destination_id'
      })
      Image.belongsTo(models.destination, {
        foreignKey: 'destination_id',
        onDelete: 'CASCADE'
      })
      
      //culinary
      models.culinary.hasMany(Image, {
        foreignKey: 'culinary_id'
      })
      Image.belongsTo(models.culinary, {
        foreignKey: 'culinary_id',
        onDelete: 'CASCADE'
      })

      //culture
      models.culture.hasMany(Image, {
        foreignKey: 'culture_id'
      })
      Image.belongsTo(models.culture, {
        foreignKey: 'culture_id',
        onDelete: 'CASCADE'
      })

      //merchandise
      models.merchandise.hasMany(Image, {
        foreignKey: 'merchandise_id'
      })
      Image.belongsTo(models.merchandise, {
        foreignKey: 'merchandise_id',
        onDelete: 'CASCADE'
      })
    }

    
  }
  Image.init({
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_gambar: DataTypes.STRING,
    type_gambar: DataTypes.STRING,
    images_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return Image;
};