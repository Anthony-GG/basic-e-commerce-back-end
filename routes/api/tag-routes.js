const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data

      //Returns all of the tags using include to include Category and Product models in the results
      const tags = await Tag.findAll({
        include:[
          // {model: Category},
          {model: Product, through: 'ProductTag'},
        ]
      });
  
      //Sends the response in a JSON format
      res.json(tags);

});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

      //Returns all of the tags using include to include Category and Tag models in the results
      const tags = await Tag.findByPk(req.params.id, {
        include:[
          // {model: Category},
          {model: Product, through: 'ProductTag'},
        ]
      });
  
      //Sends the response in a JSON format
      res.json(tags);
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body);

  res.status(200).send("success")
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(await req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).send("success")
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {id: req.params.id},
    })
    //Sends response back to avoid timeout and to show user success!
    res.status(202).send("Deletion of ID " + req.params.id +" successful!")
});

module.exports = router;
