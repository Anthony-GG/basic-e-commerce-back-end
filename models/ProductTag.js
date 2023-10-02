const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

// imports product to be referenced for the primary key
const Product = require('./Product')

const Tag = require('./Tag')

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

//Associations of Products and Tags so they can belong to many different models
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // Name of the foreign key in the ProductTag model that links to Product
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // Name of the foreign key in the ProductTag model that links to Tag
});

module.exports = ProductTag;
