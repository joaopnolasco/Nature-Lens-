// server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Importar rotas
import identifyRoute from './routes/identify.js';
import favoriteSpeciesRoute from './routes/favoriteSpecies.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) =>
    console.error('Erro na conexão com o MongoDB:', error.message)
  );

// Usar rotas
app.use('/api/identify', identifyRoute);
app.use('/api/favoritespecies', favoriteSpeciesRoute);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
