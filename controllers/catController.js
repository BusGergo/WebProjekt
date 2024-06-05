const Category = require('../models/Category');

exports.getAll = (req, res) => {
    Category.getAll((err, result) => {
        if(err){
            return res.status(500).send({message: 'Error getting categories'});
        }

        console.log(result);

        res.render('addProduct', {categories: result});
    });
}