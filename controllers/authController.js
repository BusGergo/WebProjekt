const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = (req, res) => {
    const {username, email, password} = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({ message: 'Error hashing password', error: err });
        }

        const new_user = {
            username: username,
            email: email,
            password_hash: hash
        }

        User.addUser(new_user, (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error registering user', error: err });
            }
            res.redirect('/auth/login');
        });
    });

}


exports.login = (req, res) => {
    const { username, password } = req.body;
    
    User.findByUsername(username, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error fetching user', error: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password_hash, (err, isMatch) => {
                if (isMatch) {
                    req.session.user = result[0];
                    res.redirect('/');
                } else {
                    res.status(401).send({ message: 'Incorrect password' });
                }
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    });
};