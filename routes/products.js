const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product', productController.addproduct);


module.exports = router;