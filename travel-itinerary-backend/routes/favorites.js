// routes/favorites.js
import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// Rota para salvar um itinerário favorito
router.post('/', async (req, res) => {
  const { city, description, activities, duration } = req.body;

  const newFavorite = new Favorite({
    city,
    description,
    activities,
    duration,
  });

  try {
    const savedFavorite = await newFavorite.save();
    res.json(savedFavorite);
  } catch (error) {
    console.error('Erro ao salvar o favorito:', error.message);
    res.status(500).json({ error: 'Erro ao salvar o favorito' });
  }
});

// Rota para obter todos os itinerários favoritos
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    console.error('Erro ao obter os favoritos:', error.message);
    res.status(500).json({ error: 'Erro ao obter os favoritos' });
  }
});

// Rota para excluir um itinerário favorito por ID
router.delete('/:id', async (req, res) => {
  try {
    const removedFavorite = await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Favorito excluído com sucesso', removedFavorite });
  } catch (error) {
    console.error('Erro ao excluir o favorito:', error.message);
    res.status(500).json({ error: 'Erro ao excluir o favorito' });
  }
});

export default router;
