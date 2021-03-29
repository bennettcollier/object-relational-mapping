const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
    Category.findAll({
        order: [['id', 'ASC']],
        include: [{ model: Product }]
    }).then(dbRes => res.json(dbRes))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Category.findAll({
        include: [
            {
                model: Product
            }
        ],
        where: { id: req.params.id }
    }).then(dbRes => {

        if (!dbRes) {
            res.status(404).json({ message: 'There are no categories with this ID.' });
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
    Category.create({
        category_name: req.body.category_name
    }).then(dbRes => res.json(dbRes))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', (req, res) => {
    console.log(req.body.category_name);
    Category.update(
        {
            category_name: req.body.category_name
        },
        {
            where: { id: req.params.id }
        }
    ).then(dbRes => {
        if (!dbRes) {
            res.status(404).json({ message: 'here are no categories with this ID.' });
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
    Category.destroy({
        where: { id: req.params.id }
    }).then(dbRes => {
        if (!dbRes) {
            res.status(404).json({ message: 'here are no categories with this ID.' });
            return;
        }
        res.json(dbRes);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;