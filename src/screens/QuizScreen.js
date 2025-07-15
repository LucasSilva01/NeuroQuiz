import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';

function QuizScreen({ route, navigation }) {
  const { quizData } = route.params;

  if (!quizData) {
    return <ScreenBackground><View style={styles.container}><Text style={styles.errorText}>ERRO: Dados do quiz não foram recebidos.</Text></View></ScreenBackground>;
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <ScreenBackground><View style={styles.container}><Text style={styles.errorText}>ERRO: Não foi possível carregar a pergunta atual.</Text></View></ScreenBackground>;
  }

  const handleAnswerPress = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
  
    setUserAnswers(prev => [...prev, { questionId: currentQuestion.id, selectedAnswerId: answer.id }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      navigation.navigate('QuizResult', {
        score: score,
        quizData: quizData,
        userAnswers: userAnswers, 
      });
    }
  };

  const getAnswerStyle = (answer) => {
    const style = { button: { ...styles.answerButton }, text: { ...styles.answerButtonText } };
    if (!isAnswered) { return style; }
    if (answer.isCorrect) {
      style.button.backgroundColor = '#d4edda';
      style.button.borderColor = '#c3e6cb';
      style.text.color = '#155724';
      style.text.fontWeight = 'bold';
    } else if (answer.id === selectedAnswer?.id) {
      style.button.backgroundColor = '#f8d7da';
      style.button.borderColor = '#f5c6cb';
      style.text.color = '#721c24';
    }
    return style;
  };

  return (
    <ScreenBackground>
        <View style={styles.container}>
            <Text style={styles.progressText}>Pergunta {currentQuestionIndex + 1} de {quizData.questions.length}</Text>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
            <View style={styles.answersContainer}>
                {currentQuestion.answers.map(answer => {
                  const answerStyle = getAnswerStyle(answer);
                  return (
                    <TouchableOpacity
                      key={answer.id}
                      style={answerStyle.button}
                      onPress={() => handleAnswerPress(answer)}
                      disabled={isAnswered}
                    >
                      <Text style={answerStyle.text}>{answer.text}</Text>
                    </TouchableOpacity>
                  )
                })}
            </View>
            {isAnswered && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentQuestionIndex < quizData.questions.length - 1 ? 'Próxima' : 'Finalizar'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    errorText: { fontSize: 18, color: 'white', textAlign: 'center' },
    progressText: { textAlign: 'center', fontSize: 16, marginBottom: 20, color: '#fff', fontWeight: 'bold' },
    questionText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#fff' },
    answersContainer: { flex: 1, justifyContent: 'center' },
    answerButton: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 15, borderRadius: 8, borderWidth: 2, borderColor: 'transparent', marginBottom: 10 },
    answerButtonText: { fontSize: 16, color: '#333', textAlign: 'center' },
    nextButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
    nextButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default QuizScreen;