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
        foreignKey: 'reference_id'
      })
      Image.belongsTo(models.city, {
        foreignKey: 'reference_id',
        onDelete: 'CASCADE'
      })
      
      //destination
      models.destination.hasMany(Image, {
        foreignKey: 'reference_id'
      })
      Image.belongsTo(models.destination, {
        foreignKey: 'reference_id',
        onDelete: 'CASCADE'
      })
      
      //culinary
      models.culinary.hasMany(Image, {
        foreignKey: 'reference_id'
      })
      Image.belongsTo(models.culinary, {
        foreignKey: 'reference_id',
        onDelete: 'CASCADE'
      })

      //culture
      models.culture.hasMany(Image, {
        foreignKey: 'reference_id'
      })
      Image.belongsTo(models.culture, {
        foreignKey: 'reference_id',
        onDelete: 'CASCADE'
      })

      //merchandise
      models.merchandise.hasMany(Image, {
        foreignKey: 'reference_id'
      })
      Image.belongsTo(models.merchandise, {
        foreignKey: 'reference_id',
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
    reference_id: DataTypes.INTEGER,
    nama_gambar: DataTypes.STRING,
    type_gambar: DataTypes.STRING,
    images_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return Image;
};