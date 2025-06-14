export const mockQuizzes = [
  {
    id: 'q1',
    title: 'Hardware Básico',
    questions: [
      {
        id: 'q1p1',
        text: 'O que significa a sigla CPU?',
        answers: [
          { id: 'q1p1a1', text: 'Unidade Central de Processamento', isCorrect: true },
          { id: 'q1p1a2', text: 'Placa de Vídeo Central', isCorrect: false },
          { id: 'q1p1a3', text: 'Memória de Acesso Rápido', isCorrect: false },
        ],
      },
      {
        id: 'q1p2',
        text: 'Qual componente é responsável por armazenar dados temporariamente enquanto o PC está ligado?',
        answers: [
          { id: 'q1p2a1', text: 'SSD', isCorrect: false },
          { id: 'q1p2a2', text: 'Memória RAM', isCorrect: true },
          { id: 'q1p2a3', text: 'Processador', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'q2',
    title: 'Redes e Internet',
    questions: [
       {
        id: 'q2p2',
        text: 'Qual dispositivo conecta sua rede local à Internet?',
        answers: [
          { id: 'q2p2a1', text: 'Roteador', isCorrect: true },
          { id: 'q2p2a2', text: 'Switch', isCorrect: false },
          { id: 'q2p2a3', text: 'Placa de rede', isCorrect: false },
        ],
      },
    ],
  },
];

export let mockHistory = [];

export const addHistoryItem = (newItem) => {
  mockHistory.unshift(newItem);
};

export const deleteHistoryItem = (idToDelete) => {
  mockHistory = mockHistory.filter(item => item.id !== idToDelete);
};