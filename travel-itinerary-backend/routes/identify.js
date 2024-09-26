// routes/identify.js

import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import { VertexAI } from '@google-cloud/vertexai';
import fetch from 'node-fetch';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Configurar o cliente Vertex AI
const project = 'gen-lang-client-0820652330'; // Substitua pelo ID do seu projeto
const location = 'us-central1'; // Ou outra região suportada

const vertexAI = new VertexAI({ project, location });

const modelId = 'gemini-1.0-pro-vision';
const generativeVisionModel = vertexAI.getGenerativeModel({ model: modelId });

// Função para buscar dados da espécie no GBIF
async function getSpeciesData(speciesName) {
  const response = await fetch(`https://api.gbif.org/v1/species?name=${encodeURIComponent(speciesName)}`);
  const data = await response.json();
  return data.results[0]; // Retorna o primeiro resultado encontrado
}

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageData = await fs.readFile(imagePath, { encoding: 'base64' });

    const filePart = {
      inlineData: {
        data: imageData,
        mimeType: req.file.mimetype,
      },
    };

    const textPart = {
      text: 'Caso a imagem esteja relacionada com animais ou plantas, identifique a espécie nesta imagem e forneça detalhes sobre essa espécie, caso não esteja relacionado com animais ou plantas retorne "Envie a imagem de uma espécie de planta ou anaimal".',
    };

    const request = {
      contents: [
        {
          role: 'user',
          parts: [textPart, filePart],
        },
      ],
    };

    const result = await generativeVisionModel.generateContent(request);
    const responseContent = result.response.candidates[0].content.parts[0];
    const description = responseContent.text;

    // Buscar dados adicionais da espécie
    const speciesData = await getSpeciesData(description);

    // Limpar o arquivo de imagem temporário
    await fs.unlink(imagePath);

    res.json({ description, speciesData });
  } catch (error) {
    console.error('Erro ao identificar a espécie:', error);
    res.status(500).json({
      error: 'Erro ao identificar a espécie',
      detalhes: error.message,
    });
  }
});

export default router;
