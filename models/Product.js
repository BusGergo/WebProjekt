const db = require('./db');

const Product = {};

Product.addProduct = (product, callback) => {
    db.query(
        'INSERT INTO products VALUE (?, ?, ?, ?, ?, ?)',
        [product.category_id, product.name, product.description, product.price, product.stock_quantity],
        callback
    );
};

Product.getAll = (callback) => {
    db.query(
        'select * from products',
        [],
        callback  
    );
};

module.exports = Product;