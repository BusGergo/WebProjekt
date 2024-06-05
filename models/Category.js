const db = require('./db');

const Category = {};

Category.getbyName = (name, callback) => {
    db.query(
        'select category_id from categories where name = ?',
        [name],
        callback
    )
}

Category.getAll = (callback) => {
    db.query(
        'select * from categories',
        [],
        callback
    );
}

module.exports = Category;