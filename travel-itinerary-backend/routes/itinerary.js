import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Inicializar a API com a chave do .env
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

router.get('/:city', async (req, res) => {
  const city = req.params.city;

  try {
    if (!process.env.API_KEY) {
      throw new Error('API_KEY não está definida no arquivo .env');
    }

    // Inicializando o modelo 'gemini-1.5-flash'
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Definindo o prompt com base na cidade
    const prompt = `Crie um itinerário detalhado de viagem de 3 dias para a cidade de ${city}, incluindo as principais atrações turísticas, restaurantes recomendados e dicas de transporte.`;

    // Passando o prompt no formato adequado
    const result = await model.generateContent({
      contents: [
        {
          role: 'user', // Definindo o papel como "user"
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000, // Definindo o limite de tokens
        temperature: 0.7, // Controla a criatividade da resposta
      },
    });

    // Extraindo o texto da resposta
    const response = await result.response;
    const itinerary = response.text(); // Acessa o texto da resposta gerada

    res.json({ itinerary });
  } catch (error) {
    console.error('Erro ao obter o roteiro:', error);
    res.status(500).json({ error: 'Erro ao obter o roteiro', detalhes: error.message });
  }
});

export default router;

