// Middleware de validation pour les produits
const validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;
  const errors = [];

  // Validation du nom
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Le nom doit être une chaîne non vide');
    }
    if (name.length > 100) {
      errors.push('Le nom ne doit pas dépasser 100 caractères');
    }
  }

  // Validation du prix
  if (price !== undefined) {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      errors.push('Le prix doit être un nombre positif');
    }
  }

  // Validation du stock
  if (stock !== undefined) {
    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
      errors.push('Le stock doit être un nombre entier positif');
    }
  }

  // S'il y a des erreurs, retourner une réponse 400
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  // Sinon, continuer
  next();
};

module.exports = validateProduct;
