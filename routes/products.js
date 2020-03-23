const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/product', productController.addproduct);
router.get('/product/:id', productController.product);
router.get('/product/keyword/:keyword', productController.keyproduct);
router.get('/all', productController.allproduct);


module.exports = router;