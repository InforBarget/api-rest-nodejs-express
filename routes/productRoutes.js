const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route de recherche (doit être avant /:id pour éviter les conflits)
router.get('/search', productController.searchProducts);

// Routes CRUD
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
