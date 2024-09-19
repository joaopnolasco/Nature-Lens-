// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro na conexão com o MongoDB:', error));

// Importar rotas
const itineraryRoute = require('./routes/itinerary');
const favoritesRoute = require('./routes/favorites');

app.use('/api/itinerary', itineraryRoute);
app.use('/api/favorites', favoritesRoute);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
