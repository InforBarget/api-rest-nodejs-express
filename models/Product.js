// Simulation d'une base de données en mémoire
let products = [
  {
    id: 1,
    name: 'Ordinateur portable',
    description: 'PC portable 15 pouces',
    price: 899.99,
    stock: 15,
    category: 'Informatique',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Souris sans fil',
    description: 'Souris ergonomique Bluetooth',
    price: 29.99,
    stock: 50,
    category: 'Accessoires',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Clavier mécanique',
    description: 'Clavier RGB avec switches Cherry MX',
    price: 149.99,
    stock: 25,
    category: 'Accessoires',
    createdAt: new Date().toISOString()
  }
];

class Product {
  // Récupérer tous les produits
  static getAll() {
    return products;
  }

  // Récupérer un produit par ID
  static getById(id) {
    return products.find(p => p.id === parseInt(id));
  }

  // Créer un nouveau produit
  static create(productData) {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...productData,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  }

  // Mettre à jour un produit
  static update(id, productData) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...productData,
      id: products[index].id, // Garder l'ID original
      updatedAt: new Date().toISOString()
    };
    return products[index];
  }

  // Supprimer un produit
  static delete(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  }

  // Rechercher des produits par catégorie
  static getByCategory(category) {
    return products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Rechercher des produits par nom
  static search(query) {
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}

module.exports = Product;
