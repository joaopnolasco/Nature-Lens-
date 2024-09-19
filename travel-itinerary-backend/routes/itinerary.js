// routes/itinerary.js
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

router.get('/:city', async (req, res) => {
  const city = req.params.city;

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY não está definida no arquivo .env');
    }

    // Instanciar a classe OpenAI com a chave de API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Crie um itinerário detalhado de viagem de 3 dias para a cidade de ${city}, incluindo as principais atrações turísticas, restaurantes recomendados e dicas de transporte.`;

    // Fazer a requisição à API usando o novo método
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Extrair o itinerário da resposta
    const itinerary = response.choices[0].message.content.trim();

    res.json({ itinerary });
  } catch (error) {
    console.error(
      'Erro ao obter o roteiro:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Erro ao obter o roteiro' });
  }
});

export default router;
