// test-openai.js
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const prompt = 'Diga olá em português.';

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const output = response.choices[0].message.content.trim();
    console.log('Resposta da OpenAI:', output);
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
  }
})();
