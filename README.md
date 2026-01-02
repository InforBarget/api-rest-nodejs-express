# 🚀 API REST avec Node.js et Express

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![License](https://img.shields.io/badge/license-MIT-orange)

Une API REST complète et professionnelle pour la gestion de produits, développée avec Node.js et Express. Projet idéal pour apprendre les fondamentaux du développement backend.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Utilisation](#-utilisation)
- [Endpoints API](#-endpoints-api)
- [Tests avec Postman](#-tests-avec-postman)
- [Structure du projet](#-structure-du-projet)
- [Technologies utilisées](#-technologies-utilisées)
- [Exemples de requêtes](#-exemples-de-requêtes)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Améliorations futures](#-améliorations-futures)
- [Contribuer](#-contribuer)
- [Licence](#-licence)
- [Auteur](#-auteur)

## ✨ Fonctionnalités

- ✅ **CRUD complet** : Créer, Lire, Mettre à jour, Supprimer des produits
- ✅ **Recherche avancée** : Par nom, description ou catégorie
- ✅ **Validation des données** : Middleware de validation personnalisé
- ✅ **Gestion d'erreurs** : Messages d'erreur clairs et codes HTTP appropriés
- ✅ **Logging** : Suivi des requêtes avec timestamps
- ✅ **CORS activé** : Compatible avec les applications frontend
- ✅ **Architecture MVC** : Code organisé et maintenable
- ✅ **API RESTful** : Respect des standards REST

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- Un éditeur de code ([VS Code](https://code.visualstudio.com/) recommandé)
- [Postman](https://www.postman.com/) ou un client REST similaire

Vérifiez vos installations :

```bash
node --version
npm --version
```

## 📦 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/api-rest-nodejs-express.git
cd api-rest-nodejs-express
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer le fichier d'environnement

```bash
cp .env.example .env
```

Ou créez manuellement un fichier `.env` à la racine :

```env
PORT=3000
NODE_ENV=development
```

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `PORT` | Port du serveur | `3000` |
| `NODE_ENV` | Environnement d'exécution | `development` |

### Personnalisation

Vous pouvez modifier les données initiales dans `models/Product.js` :

```javascript
let products = [
  // Ajoutez vos produits par défaut ici
];
```

## 🚀 Utilisation

### Démarrer le serveur en mode développement

```bash
npm run dev
```

Le serveur redémarrera automatiquement à chaque modification (grâce à nodemon).

### Démarrer le serveur en mode production

```bash
npm start
```

### Accéder à l'API

Une fois démarré, l'API est accessible sur :
```
http://localhost:3000
```

Page d'accueil de l'API :
```
http://localhost:3000/
```

## 📚 Endpoints API

### Vue d'ensemble

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Page d'accueil de l'API |
| `GET` | `/api/products` | Récupérer tous les produits |
| `GET` | `/api/products/:id` | Récupérer un produit par ID |
| `POST` | `/api/products` | Créer un nouveau produit |
| `PUT` | `/api/products/:id` | Mettre à jour un produit |
| `DELETE` | `/api/products/:id` | Supprimer un produit |
| `GET` | `/api/products/search?q=terme` | Rechercher par mot-clé |
| `GET` | `/api/products/search?category=nom` | Filtrer par catégorie |

### Détails des endpoints

#### GET / - Page d'accueil

**Réponse :**
```json
{
  "message": "Bienvenue sur notre API REST !",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products"
  }
}
```

#### GET /api/products - Tous les produits

**Réponse :**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Ordinateur portable",
      "description": "PC portable 15 pouces",
      "price": 899.99,
      "stock": 15,
      "category": "Informatique",
      "createdAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

#### GET /api/products/:id - Produit par ID

**Paramètres :** `id` (number) - ID du produit

**Réponse (succès) :**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ordinateur portable",
    "price": 899.99
  }
}
```

**Réponse (erreur 404) :**
```json
{
  "success": false,
  "error": "Produit non trouvé"
}
```

#### POST /api/products - Créer un produit

**Body (JSON) :**
```json
{
  "name": "Webcam HD",
  "description": "Webcam 1080p avec microphone intégré",
  "price": 79.99,
  "stock": 30,
  "category": "Accessoires"
}
```

**Champs requis :** `name`, `price`

**Réponse (succès - 201) :**
```json
{
  "success": true,
  "message": "Produit créé avec succès",
  "data": {
    "id": 4,
    "name": "Webcam HD",
    "price": 79.99,
    "createdAt": "2025-01-01T10:30:00.000Z"
  }
}
```

**Réponse (erreur validation - 400) :**
```json
{
  "success": false,
  "error": "Le nom et le prix sont obligatoires"
}
```

#### PUT /api/products/:id - Mettre à jour

**Paramètres :** `id` (number)

**Body (JSON) - Tous les champs sont optionnels :**
```json
{
  "price": 849.99,
  "stock": 10
}
```

**Réponse (succès) :**
```json
{
  "success": true,
  "message": "Produit mis à jour avec succès",
  "data": {
    "id": 1,
    "name": "Ordinateur portable",
    "price": 849.99,
    "stock": 10,
    "updatedAt": "2025-01-01T11:00:00.000Z"
  }
}
```

#### DELETE /api/products/:id - Supprimer

**Paramètres :** `id` (number)

**Réponse (succès) :**
```json
{
  "success": true,
  "message": "Produit supprimé avec succès"
}
```

#### GET /api/products/search - Recherche

**Query Parameters :**
- `q` (string) : Recherche par nom ou description
- `category` (string) : Filtrer par catégorie

**Exemples :**
```
GET /api/products/search?q=souris
GET /api/products/search?category=Accessoires
```

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

## 🧪 Tests avec Postman

### Configuration initiale de Postman

#### 1. Créer une collection

1. Ouvrir Postman
2. Cliquer sur **"New"** → **"Collection"**
3. Nom de la collection : **"API REST Products"**
4. Cliquer sur **"Create"**

#### 2. Configurer l'environnement

1. Cliquer sur **"Environments"** (icône œil en haut à droite)
2. Cliquer sur **"Create Environment"**
3. Nom : **"Local Development"**
4. Ajouter une variable :
   - Variable : `base_url`
   - Initial Value : `http://localhost:3000/api`
   - Current Value : `http://localhost:3000/api`
5. Cliquer sur **"Save"**
6. Sélectionner cet environnement dans le menu déroulant en haut à droite

### Requêtes Postman étape par étape

#### Test 1 : GET - Tous les produits

1. Dans la collection "API REST Products", cliquer sur **"Add request"**
2. Nom : **"GET All Products"**
3. Méthode : **GET**
4. URL : `{{base_url}}/products`
5. Onglet **"Headers"** : laisser vide (aucun header nécessaire)
6. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Liste de tous les produits

#### Test 2 : GET - Produit par ID

1. Nouvelle requête → **"GET Product by ID"**
2. Méthode : **GET**
3. URL : `{{base_url}}/products/1`
4. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Détails du produit avec ID 1

**Test d'erreur :**
- URL : `{{base_url}}/products/999`
- Status attendu : `404 Not Found`

#### Test 3 : POST - Créer un produit

1. Nouvelle requête → **"POST Create Product"**
2. Méthode : **POST**
3. URL : `{{base_url}}/products`
4. Onglet **"Headers"** :
   - Cliquer sur **"Add"**
   - Key : `Content-Type`
   - Value : `application/json`
5. Onglet **"Body"** :
   - Sélectionner **"raw"**
   - Choisir **"JSON"** dans le menu déroulant
   - Copier ce JSON :

```json
{
  "name": "Webcam HD",
  "description": "Webcam 1080p avec microphone intégré",
  "price": 79.99,
  "stock": 30,
  "category": "Accessoires"
}
```

6. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `201 Created`
- Body : Nouveau produit créé avec son ID

**Tests supplémentaires :**

**Test sans nom (erreur) :**
```json
{
  "description": "Test",
  "price": 10.00
}
```
- Status attendu : `400 Bad Request`

**Test produit minimal :**
```json
{
  "name": "Casque audio",
  "price": 59.99
}
```
- Status attendu : `201 Created`

#### Test 4 : PUT - Mettre à jour un produit

1. Nouvelle requête → **"PUT Update Product"**
2. Méthode : **PUT**
3. URL : `{{base_url}}/products/1`
4. Headers :
   - `Content-Type` : `application/json`
5. Body (raw - JSON) :

```json
{
  "price": 849.99,
  "stock": 10
}
```

6. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Produit mis à jour avec `updatedAt`

**Test mise à jour complète :**
```json
{
  "name": "PC Portable Gaming",
  "description": "Ordinateur portable haute performance",
  "price": 1299.99,
  "stock": 5,
  "category": "Informatique Premium"
}
```

#### Test 5 : DELETE - Supprimer un produit

1. Nouvelle requête → **"DELETE Product"**
2. Méthode : **DELETE**
3. URL : `{{base_url}}/products/3`
4. Pas de headers ni body nécessaires
5. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Message de confirmation

**Test d'erreur :**
- URL : `{{base_url}}/products/999`
- Status attendu : `404 Not Found`

#### Test 6 : GET - Recherche par catégorie

1. Nouvelle requête → **"GET Search by Category"**
2. Méthode : **GET**
3. URL : `{{base_url}}/products/search`
4. Onglet **"Params"** :
   - Key : `category`
   - Value : `Accessoires`
5. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Liste des produits de la catégorie "Accessoires"

**Autres tests :**
- `category` : `Informatique`

#### Test 7 : GET - Recherche par mot-clé

1. Nouvelle requête → **"GET Search by Keyword"**
2. Méthode : **GET**
3. URL : `{{base_url}}/products/search`
4. Onglet **"Params"** :
   - Key : `q`
   - Value : `souris`
5. Cliquer sur **"Send"**

**Résultat attendu :**
- Status : `200 OK`
- Body : Produits contenant "souris" dans le nom ou la description

**Autres tests :**
- `q` : `portable`
- `q` : `clavier`
- `q` : `xyz` (aucun résultat)

### Tests automatisés dans Postman

Pour chaque requête, vous pouvez ajouter des tests automatiques :

#### Exemple pour GET All Products :

Dans l'onglet **"Tests"** de la requête :

```javascript
// Test du code de statut
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test de la structure de réponse
pm.test("Response has success property", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

// Test du nombre de produits
pm.test("Response contains products array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData.data).to.be.an('array');
});

// Test du temps de réponse
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
```

#### Exemple pour POST Create Product :

```javascript
// Test du code de statut
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

// Test de la création
pm.test("Product created successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData).to.have.property('data');
    pm.expect(jsonData.data).to.have.property('id');
});

// Sauvegarder l'ID pour les tests suivants
pm.test("Save product ID", function () {
    var jsonData = pm.response.json();
    pm.environment.set("product_id", jsonData.data.id);
});
```

### Exporter/Importer la collection Postman

#### Exporter la collection :

1. Clic droit sur la collection "API REST Products"
2. **"Export"**
3. Choisir **"Collection v2.1"**
4. Sauvegarder le fichier : `API_REST_Products.postman_collection.json`

#### Importer la collection :

1. Cliquer sur **"Import"** en haut à gauche
2. Glisser-déposer le fichier JSON ou cliquer sur **"Choose Files"**
3. Cliquer sur **"Import"**

### Organisation de la collection

Structure recommandée :

```
📁 API REST Products
  📂 Products
    ├── 📄 GET All Products
    ├── 📄 GET Product by ID
    ├── 📄 POST Create Product
    ├── 📄 PUT Update Product
    ├── 📄 DELETE Product
  📂 Search
    ├── 📄 GET Search by Category
    └── 📄 GET Search by Keyword
  📂 Error Tests
    ├── 📄 GET Non-existent Product (404)
    ├── 📄 POST Without Name (400)
    └── 📄 DELETE Non-existent (404)
```

## 📁 Structure du projet

```
api-rest-express/
├── config/                  # Configuration (futurs fichiers DB, etc.)
├── controllers/             # Logique métier
│   └── productController.js # Contrôleur des produits
├── middleware/              # Middleware personnalisés
│   └── validateProduct.js   # Validation des produits
├── models/                  # Modèles de données
│   └── Product.js          # Modèle Product
├── routes/                  # Définition des routes
│   └── productRoutes.js    # Routes des produits
├── node_modules/            # Dépendances (ignoré par git)
├── .env                     # Variables d'environnement (ignoré par git)
├── .env.example            # Exemple de fichier .env
├── .gitignore              # Fichiers ignorés par git
├── package.json            # Dépendances et scripts npm
├── package-lock.json       # Verrouillage des versions
├── README.md               # Documentation (ce fichier)
└── server.js               # Point d'entrée de l'application
```

## 🛠️ Technologies utilisées

### Backend
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Express.js](https://expressjs.com/)** - Framework web minimaliste

### Dépendances principales
- **[cors](https://www.npmjs.com/package/cors)** - Gestion des requêtes cross-origin
- **[body-parser](https://www.npmjs.com/package/body-parser)** - Parsing du body des requêtes
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gestion des variables d'environnement

### Dépendances de développement
- **[nodemon](https://nodemon.io/)** - Rechargement automatique du serveur

### Outils de test
- **[Postman](https://www.postman.com/)** - Tests d'API REST

## 📝 Exemples de requêtes

### Avec cURL

```bash
# Récupérer tous les produits
curl http://localhost:3000/api/products

# Récupérer un produit spécifique
curl http://localhost:3000/api/products/1

# Créer un nouveau produit
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Webcam HD",
    "description": "Webcam 1080p",
    "price": 79.99,
    "stock": 30,
    "category": "Accessoires"
  }'

# Mettre à jour un produit
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 849.99, "stock": 10}'

# Supprimer un produit
curl -X DELETE http://localhost:3000/api/products/3

# Rechercher des produits
curl "http://localhost:3000/api/products/search?q=souris"
curl "http://localhost:3000/api/products/search?category=Accessoires"
```

### Avec JavaScript (fetch)

```javascript
// GET - Tous les produits
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));

// POST - Créer un produit
fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Nouveau produit',
    price: 99.99,
    stock: 20
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// PUT - Mettre à jour
fetch('http://localhost:3000/api/products/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    price: 899.99
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// DELETE - Supprimer
fetch('http://localhost:3000/api/products/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 💻 Développement

### Ajouter un nouveau endpoint

1. Créer la méthode dans le contrôleur (`controllers/productController.js`)
2. Ajouter la route dans `routes/productRoutes.js`
3. Tester avec Postman

### Ajouter un middleware

Créez un fichier dans `middleware/` et importez-le dans vos routes :

```javascript
// middleware/auth.js
const auth = (req, res, next) => {
  // Votre logique d'authentification
  next();
};

// routes/productRoutes.js
router.post('/', auth, validateProduct, productController.createProduct);
```

### Debugging

Utilisez les logs intégrés ou ajoutez des `console.log()` :

```javascript
console.log('Request body:', req.body);
```

## 🌐 Déploiement

### Heroku

```bash
# Installer Heroku CLI
heroku login
heroku create mon-api-rest
git push heroku main
heroku open
```

### Vercel

```bash
npm install -g vercel
vercel
```

### Railway / Render

Suivez les documentations respectives de ces plateformes.

### Variables d'environnement en production

N'oubliez pas de configurer :
```
NODE_ENV=production
PORT=<port_assigné>
```

## 🚀 Améliorations futures

- [ ] Intégration d'une base de données (MongoDB / PostgreSQL)
- [ ] Authentification JWT
- [ ] Pagination des résultats
- [ ] Rate limiting
- [ ] Upload d'images pour les produits
- [ ] Documentation Swagger/OpenAPI
- [ ] Tests unitaires avec Jest
- [ ] Tests d'intégration
- [ ] Logger avancé (Winston/Morgan)
- [ ] Compression des réponses (gzip)
- [ ] Cache avec Redis
- [ ] Websockets pour les notifications temps réel
- [ ] Versioning de l'API (v1, v2...)
- [ ] GraphQL en alternative à REST

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment participer :

1. **Forkez** le projet
2. **Créez** votre branche (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines

- Respectez le style de code existant
- Ajoutez des tests si possible
- Mettez à jour la documentation
- Décrivez clairement vos changements

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Anthony - Infor'Barget**

- 🌐 Site web : [inforbarget.com](https://inforbarget.com)
- 📺 YouTube : [[Votre chaîne développeur](https://www.youtube.com/@inforbarget)]
- 💼 LinkedIn : [[Votre profil](https://www.linkedin.com/in/anthonybarget/)]
- 📧 Email : admin@inforbarget.com

**Organisation de formation**

---

## 📚 Ressources complémentaires

### Documentation officielle
- [Express.js Guide](https://expressjs.com/fr/guide/routing.html)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [REST API Best Practices](https://restfulapi.net/)
- [Postman Learning Center](https://learning.postman.com/)

### Tutoriels recommandés
- [MDN Web Docs - HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)
- [Postman API Testing Guide](https://learning.postman.com/docs/writing-scripts/test-scripts/)

### Outils utiles
- [JSON Formatter](https://jsonformatter.org/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Postman](https://www.postman.com/)

---

## 🎥 Tutoriel vidéo

Ce projet est accompagné d'un tutoriel vidéo complet disponible sur YouTube :
[[Lien vers la vidéo](https://youtu.be/UDqmBtvxQDw)]

Dans cette vidéo de 45 minutes, vous apprendrez :
- Configuration complète du projet
- Création de l'API REST étape par étape
- Tests avec Postman
- Bonnes pratiques de développement backend

---

## ⭐ Support

Si ce projet vous a aidé, n'oubliez pas de lui donner une étoile ⭐

Des questions ? Ouvrez une [issue](https://github.com/votre-username/api-rest-nodejs-express/issues) !

---

## 📊 Stats du projet

![GitHub repo size](https://img.shields.io/github/repo-size/votre-username/api-rest-nodejs-express)
![GitHub stars](https://img.shields.io/github/stars/votre-username/api-rest-nodejs-express?style=social)
![GitHub forks](https://img.shields.io/github/forks/votre-username/api-rest-nodejs-express?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/votre-username/api-rest-nodejs-express)

---

**Fait avec ❤️ par Anthony - Formation professionnelle**

*Dernière mise à jour : Janvier 2025*
