// Importation des dépendances
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importation des routes
const productRoutes = require('./routes/productRoutes');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de logging personnalisé
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur notre API REST !',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});

// Routes API
app.use('/api/products', productRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Mode: ${process.env.NODE_ENV}`);
});
