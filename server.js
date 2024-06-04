//INIT PHASE
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const authentication = require('./routes/authRoutes');
const prodRoute = require('./routes/prodRoutes');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        expires: 60 * 60 * 24
    }
}));
app.use('/auth', authentication);
app.use('/products', prodRoute);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views'), { 
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dash', { username: req.session.user.username });
    } else {
        res.redirect('/auth/login');
    }
});



//LISTENING
app.listen(process.env.PORT, () => {
    console.log(`Server is runnning at: http://localhost:${process.env.PORT}`);
});