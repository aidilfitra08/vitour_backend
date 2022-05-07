'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Culture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.city.hasMany(Culture, {
        foreignKey: 'city_id'
      });
      Culture.belongsTo(models.city, {
        foreignKey: 'city_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Culture.init({
    culture_id : {
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
    nama_budaya: {
      type: DataTypes.STRING
    },
    deskripsi_budaya: {
      type: DataTypes.TEXT
    },
    filosofi_budaya: {
      type: DataTypes.TEXT
    },
    sejarah_budaya: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'culture',
  });
  return Culture;
};