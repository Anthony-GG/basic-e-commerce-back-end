const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
    id: 1,
  },
  {
    category_name: 'Shorts',
    id: 2,
  },
  {
    category_name: 'Music',
    id: 3,
  },
  {
    category_name: 'Hats',
    id: 4,
  },
  {
    category_name: 'Shoes',
    id: 5,
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
