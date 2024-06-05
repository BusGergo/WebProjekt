const Prod = require('../models/Product');

exports.listAll = (req, res) => {

    if (req.session.user) {
        Prod.getAll((err, result) => {
            if(err){
                return res.status(500).send({ message: 'Error listing products', error: err });
            }
            
            res.render('products', { products: result });
        });
    } else {
        res.redirect('/auth/login');
    }
    
};

exports.searchProd = (req, res) => {
    const searchQuery = req.query.query;
    Prod.search(searchQuery, (err, result) => {
        if(err){
            return res.status(500).send({ message: 'Error searching products', error: err });
        }
        
        res.render('products', { products: result });
    });
};

exports.addProduct = (req, res) => {
    const { category, name, description, price, stock_quantity} = req.body;

    Prod.addProduct({ category, name, description, price, stock_quantity }, (err, result) => {
        if(err){
            return res.status(500).send({message: 'Error adding new product', error: err});
        }

        //res.render('dash');
    });
}