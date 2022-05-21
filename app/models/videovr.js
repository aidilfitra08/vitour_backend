'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoVR extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.city.hasMany(VideoVR, {
        foreignKey: 'city_id'
      });
      VideoVR.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
    }
  }
  VideoVR.init({
    video_id : {
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
    link_video: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    durasi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'videovr',
  });
  return VideoVR;
};