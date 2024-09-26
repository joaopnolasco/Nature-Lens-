// routes/favoriteSpecies.js

import express from 'express';
import FavoriteSpecies from '../models/FavoriteSpecies.js';

const router = express.Router();

// Rota para salvar uma espécie favorita
router.post('/', async (req, res) => {
  const { speciesName, description, imageUrl } = req.body;

  const newFavorite = new FavoriteSpecies({
    speciesName,
    description,
    imageUrl,
  });

  try {
    const savedFavorite = await newFavorite.save();
    res.json(savedFavorite);
  } catch (error) {
    console.error('Erro ao salvar a espécie favorita:', error.message);
    res.status(500).json({ error: 'Erro ao salvar a espécie favorita' });
  }
});

// Rota para obter todas as espécies favoritas
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteSpecies.find();
    res.json(favorites);
  } catch (error) {
    console.error('Erro ao obter as espécies favoritas:', error.message);
    res.status(500).json({ error: 'Erro ao obter as espécies favoritas' });
  }
});

// Rota para excluir uma espécie favorita por ID
router.delete('/:id', async (req, res) => {
  try {
    const removedFavorite = await FavoriteSpecies.findByIdAndDelete(req.params.id);
    res.json({ message: 'Espécie favorita excluída com sucesso', removedFavorite });
  } catch (error) {
    console.error('Erro ao excluir a espécie favorita:', error.message);
    res.status(500).json({ error: 'Erro ao excluir a espécie favorita' });
  }
});

export default router;
