// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Importar rotas
import itineraryRoute from './routes/itinerary.js';
import favoritesRoute from './routes/favorites.js';

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
app.use('/api/itinerary', itineraryRoute);
app.use('/api/favorites', favoritesRoute);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Backend está funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
