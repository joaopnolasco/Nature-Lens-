// routes/itinerary.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Rota para obter o itinerário de uma cidade específica
router.get('/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCpkVTAb2uPguqu5TIrCuopPiOV51uFUKM', {
      params: {
        city: city,
        apiKey: process.env.API_KEY, // Use sua chave de API a partir das variáveis de ambiente
      },
    });

    // Supondo que 'response.data' contenha o roteiro
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao obter o roteiro:', error.message);
    res.status(500).json({ error: 'Erro ao obter o roteiro' });
  }
});

module.exports = router;
