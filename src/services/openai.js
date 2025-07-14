// src/services/openai.js

import axios from 'axios';
import { OPENAI_API_KEY } from '../../config';

const apiClient = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
});

const createPrompt = (text) => {
  const jsonFormatExample = `
    {
      "id": "q-gerado-ai",
      "title": "Título do Quiz sobre o Texto",
      "questions": [
        {
          "id": "p1",
          "text": "Texto da primeira pergunta?",
          "answers": [
            { "id": "a1", "text": "Texto da resposta A.", "isCorrect": false },
            { "id": "a2", "text": "Texto da resposta B.", "isCorrect": true },
            { "id": "a3", "text": "Texto da resposta C.", "isCorrect": false }
          ]
        }
      ]
    }
  `;

  return `
    Analise o texto a seguir e, com base nele, crie um quiz.
    O quiz deve ter exatamente 3 perguntas de múltipla escolha.
    Cada pergunta deve ter exatamente 3 respostas.
    Apenas uma resposta por pergunta deve ser a correta.
    Retorne sua resposta EXATAMENTE no seguinte formato JSON, sem adicionar nenhum outro texto ou explicação antes ou depois do JSON. O JSON deve seguir este exemplo de estrutura: ${jsonFormatExample}

    O texto para análise é:
    """
    ${text}
    """
  `;
};

export const generateQuizFromText = async (text) => {
  console.log("Iniciando chamada REAL para a API da OpenAI...");

  try {
    const prompt = createPrompt(text);

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: prompt
      }],
      temperature: 0.5,
     
    };

    const response = await apiClient.post('', requestBody);

    const content = response.data.choices[0].message.content;
    console.log("Resposta da IA recebida:", content);

    const quizData = JSON.parse(content);
    return quizData;

  } catch (error) {
    console.error("Erro na chamada da API da OpenAI:", error.response ? error.response.data : error.message);
    throw new Error("Não foi possível gerar o quiz. A API da OpenAI retornou um erro.");
  }
};