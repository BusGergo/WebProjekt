const Prod = require('../models/Product');

exports.listAll = (req, res) => {

    if (req.session.user) {
        Prod.getAll((err, result) => {
            if(err){
                return res.status(500).send({ message: 'Error listing products', error: err });
            }
            
            res.json(result);
        });
    } else {
        res.redirect('/auth/login');
    }
    
}