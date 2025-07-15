import { GEMINI_API_KEY } from '../../config';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const createPrompt = (text) => {
  const jsonFormatExample = `
    {
      "id": "q-gemini-123",
      "title": "Um Título Criativo Sobre o Texto",
      "questions": [
        {
          "id": "p1",
          "text": "Texto da primeira pergunta gerada?",
          "answers": [
            { "id": "a1", "text": "Texto da resposta A.", "isCorrect": false },
            { "id": "a2", "text": "Texto da resposta B.", "isCorrect": true },
            { "id": "a3", "text": "Texto da resposta C.", "isCorrect": false },
            { "id": "a4", "text": "Texto da resposta D.", "isCorrect": false },
            { "id": "a5", "text": "Texto da resposta E.", "isCorrect": false }
          ]
        }
      ]
    }
  `;

  return `
    Analise o seguinte texto e, com base nele, crie um quiz.
    O quiz deve ter exatamente 5 perguntas de múltipla escolha.
    Cada pergunta deve ter exatamente 5 respostas.
    Apenas uma resposta por pergunta deve ser a correta.
    Retorne sua resposta SOMENTE no formato JSON, sem nenhum texto ou formatação adicional. O JSON deve seguir esta estrutura de exemplo: ${jsonFormatExample}

    Texto para análise:
    """
    ${text}
    """
  `;
};

export const generateQuizFromText = async (text) => {
  console.log("Iniciando chamada para a API do Google Gemini (versão robusta)...");

  try {
    const prompt = createPrompt(text);

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
      ],
      generationConfig: { "responseMimeType": "text/plain" }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.candidates) {
      throw new Error(responseData.error?.message || 'Resposta inválida da API');
    }

    const rawContent = responseData.candidates[0].content.parts[0].text;
    console.log("Resposta bruta da IA recebida:", rawContent);


    const jsonStartIndex = rawContent.indexOf('{');
    const jsonEndIndex = rawContent.lastIndexOf('}') + 1;

    if (jsonStartIndex === -1 || jsonEndIndex === 0) {
      throw new Error("A resposta da IA não continha um JSON válido.");
    }


    const jsonString = rawContent.substring(jsonStartIndex, jsonEndIndex);
    console.log("String JSON extraída para o parse:", jsonString);


    const quizData = JSON.parse(jsonString);
    return quizData;

  } catch (error) {
    console.error("Erro na chamada da API do Gemini:", error);
    throw new Error("Não foi possível gerar o quiz. A API do Gemini retornou um erro.");
  }
};