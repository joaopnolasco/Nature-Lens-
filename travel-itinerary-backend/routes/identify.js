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
  console.log('Buscando dados da espécie:', speciesName);
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
      text: `
  Ao receber uma imagem, siga este padrão de resposta, mas sem numerar ou listar os pontos explicitamente. A resposta deve ser fluida e natural:

  1. Inicie identificando se a imagem é de uma planta ou animal, e descreva brevemente o organismo, mencionando o nome comum.
  2. Informe o nome científico em itálico como parte da explicação.
  3. Explique o habitat natural da espécie, mencionando onde ela pode ser encontrada no mundo.
  4. Descreva as características distintivas, como tamanho, cor, formato e outras particularidades importantes, de forma fluida e sem listar os itens.
  5. Adicione curiosidades ou fatos interessantes sobre a espécie, integrando essas informações ao longo da explicação.
  6. A linguagem deve ser clara, acessível e informativa, como se estivesse explicando de maneira casual para um amigo.

  Se a imagem não estiver relacionada a plantas ou animais, informe ao usuário educadamente e sugira que ele selecione uma nova imagem.
  `,
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
    console.log('Arquivo de speciesData', speciesData);

    res.json({  description, speciesData });
  } catch (error) {
    console.error('Erro ao identificar a espécie:', error);
    res.status(500).json({
      error: 'Erro ao identificar a espécie',
      detalhes: error.message,
    });
  }
});

export default router;
