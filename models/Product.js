// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// imports category to be referenced for the primary key
const Category = require("./Category") 

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  //Uses associate method to avoid circular dependency between the Product and Category model
  static associate(models){
    Product.belongsTo(models.Category, {through: 'Category', foreignKey: 'category_id'});
    Product.belongsToMany(models.Tag, {through:'ProductTag', foreignKey:'product_id'})
  }
}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    //References the category_id from the Category model
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
