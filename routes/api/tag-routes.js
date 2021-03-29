const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    order: [['id', 'ASC']],
    include: [
      {
        model: ProductTag,
        include: {
          model: Product,
        }
      }
    ],
  }).then(dbRes => res.json(dbRes))
  .catch(err => {
    console.log(err);
    res.status(500).json(err); 
  });
});

router.get('/:id', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: ProductTag,
        include: {
          model: Product,
        }
      }
    ],
    where: {id: req.params.id}
  }).then(dbRes => {
    
    if(!dbRes){    
      res.status(404).json({ message: 'There are no tags with this ID.' });
      return;
    }
    res.json(dbRes)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err); 
  });

});

router.post('/', (req, res) => {
   Tag.create({
    tag_name: req.body.tag_name
  }).then(dbRes => res.json(dbRes))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
   {
    where: {id:req.params.id}
   }
   ).then(dbRes => { 
    if(!dbRes){    
      res.status(404).json({ message: 'There are no tags with this ID.' });
      return;
    }

      res.json(dbRes)
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
   // delete a category by its `id` value
   Tag.destroy({
    where: {id: req.params.id}
  }).then(dbRes => {
    if(!dbRes){
      res.status(404).json({ message: 'There are no tags with this ID.' });
      return;
    }
    res.json(dbRes);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;