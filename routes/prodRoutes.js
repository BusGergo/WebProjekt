const express = require('express');
const router = express.Router();
const controller = require('../controllers/prodController');
const catController = require('../controllers/catController');

router.get('/', controller.listAll);

router.get('/search', controller.searchProd);

router.post('/add', controller.addProduct);

router.get('/add', catController.getAll);

module.exports = router;