const db = require('./db');

const User = {};

User.addUser = (user, callback) => {
    db.query(
        'insert into users (username, email, password_hash) values (?, ?, ?)',
        [user.username, user.email, user.password_hash],
        callback
    );
}

User.findByUsername = (username, callback) => {
    db.query(
        'select * from users where username = ?',
        [username],
        callback
    );
}

module.exports = User;