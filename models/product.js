'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product's name can't be empty",
        },
        notEmpty: {
          msg: "Product's name can't be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL can't be empty"
        },
        notEmpty: {
          msg: "Image URL can't be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInteger(value) {
          if (typeof value !== 'number') {
            throw new Error ('Input the right format') 
          }
        },
        min: {
          args: [[0]],
          msg: "Product's price can't be less than 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [[0]],
          msg: "Product's stock can't be less than zero"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};