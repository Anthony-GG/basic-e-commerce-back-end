const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
          //Returns all of the catagories using include to include Products in results
      const categories = await Category.findAll({
        include:[
          {model: Product},
        ]
      });
  
      //Sends the response in a JSON format
      res.json(categories);
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

        //Returns all of the catagories using include to include Products in results
        const category = await Category.findByPk(req.params.id, {
          include:[
            {model: Product},
          ]
        });
    
        //Sends the response in a JSON format
        res.json(category);
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body);

  res.status(200).send("success")
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    Category.update(await req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).send("success")
});

router.delete('/:id', async (req, res) => {

  //deletes associated products first
  const deletedProducts = await Product.destroy({
    where: {category_id: req.params.id},
  });

  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {id: req.params.id},
  })
  //Sends response back to avoid timeout and to show user success!
  res.status(202).send("Deletion of ID " + req.params.id +" successful!")
});

module.exports = router;
