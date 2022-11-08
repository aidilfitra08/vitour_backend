'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    order_id : {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id:{
      type : DataTypes.INTEGER,
      allowNull:false
    },
    total_price :{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    response_midtrans: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    status:{
      type: DataTypes.STRING,
      allowNull:true
    }

  }, {
    sequelize,
    modelName: 'order',
  });
  return Order;
};