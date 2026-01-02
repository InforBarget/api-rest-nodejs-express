const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = (req, res) => {
  try {
    const products = Product.getAll();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des produits'
    });
  }
};

// Récupérer un produit par ID
exports.getProductById = (req, res) => {
  try {
    const product = Product.getById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du produit'
    });
  }
};

// Créer un nouveau produit
exports.createProduct = (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    // Validation basique
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        error: 'Le nom et le prix sont obligatoires'
      });
    }
    
    const newProduct = Product.create({
      name,
      description: description || '',
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      category: category || 'Général'
    });
    
    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création du produit'
    });
  }
};

// Mettre à jour un produit
exports.updateProduct = (req, res) => {
  try {
    const updatedProduct = Product.update(req.params.id, req.body);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour du produit'
    });
  }
};

// Supprimer un produit
exports.deleteProduct = (req, res) => {
  try {
    const deleted = Product.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression du produit'
    });
  }
};

// Rechercher des produits
exports.searchProducts = (req, res) => {
  try {
    const { q, category } = req.query;
    
    let results;
    
    if (category) {
      results = Product.getByCategory(category);
    } else if (q) {
      results = Product.search(q);
    } else {
      results = Product.getAll();
    }
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la recherche'
    });
  }
};
