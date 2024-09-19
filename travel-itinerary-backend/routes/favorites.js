// routes/favorites.js
const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Rota para salvar um itinerário favorito
router.post('/', async (req, res) => {
  const { city, description, activities, duration } = req.body;

  const newItinerary = new Itinerary({
    city,
    description,
    activities,
    duration,
  });

  try {
    const savedItinerary = await newItinerary.save();
    res.json(savedItinerary);
  } catch (error) {
    console.error('Erro ao salvar o itinerário:', error.message);
    res.status(500).json({ error: 'Erro ao salvar o itinerário' });
  }
});

// Rota para obter todos os itinerários favoritos
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    console.error('Erro ao obter os itinerários:', error.message);
    res.status(500).json({ error: 'Erro ao obter os itinerários' });
  }
});

// Rota para excluir um itinerário favorito por ID
router.delete('/:id', async (req, res) => {
  try {
    const removedItinerary = await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Itinerário excluído com sucesso', removedItinerary });
  } catch (error) {
    console.error('Erro ao excluir o itinerário:', error.message);
    res.status(500).json({ error: 'Erro ao excluir o itinerário' });
  }
});

module.exports = router;
