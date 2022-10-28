'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.merchandise.hasMany(Cart, {
        foreignKey: 'merchandise_id'
      });
      Cart.belongsTo(models.merchandise, {
        foreignKey: 'merchandise_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Cart.init({
    cart_id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    merchandise_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'merchandises',
        key: 'merchandise_id',
        as: 'merchandise_id'
      }
    },
    user_id: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'cart',
  });
  return Cart;
};