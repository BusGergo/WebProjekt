const db = require('./db');

const Product = {};

Product.addProduct = (product, callback) => {

    db.query(
        'insert into products (category_id, name, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?)',
        [product.category, product.name, product.description, product.price, product.stock_quantity],
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

Product.search = (query, callback) => {
    db.query(
        'select * from products where name like ?',
        ['%' + query + '%'],
        callback
    );
};

module.exports = Product;