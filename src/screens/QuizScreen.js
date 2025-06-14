import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { mockQuizzes } from '../data/mocks';

function QuizScreen({ route, navigation }) {
  const { quizId } = route.params;
  const quizData = mockQuizzes.find(q => q.id === quizId);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); 

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleAnswerPress = (answer) => {
    if (isAnswered) return; 

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {

      navigation.navigate('QuizResult', {
        score: score,
        totalQuestions: quizData.questions.length,

        quizTitle: quizData.title,
      });
    }
  };


  const getButtonColor = (answer) => {
    if (!isAnswered) {
      return '#e0e0e0'; 
    }
    if (answer.isCorrect) {
      return '#d4edda'; 
    }
    if (answer.id === selectedAnswer?.id && !answer.isCorrect) {
      return '#f8d7da'; 
    }
    return '#e0e0e0'; 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.progressText}>
        Pergunta {currentQuestionIndex + 1} de {quizData.questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.text}</Text>

      <View style={styles.answersContainer}>
        {currentQuestion.answers.map(answer => (
          <TouchableOpacity
            key={answer.id}
            style={[styles.answerButton, { backgroundColor: getButtonColor(answer) }]}
            onPress={() => handleAnswerPress(answer)}
            disabled={isAnswered}
          >
            <Text>{answer.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < quizData.questions.length - 1 ? 'Próxima' : 'Finalizar'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    progressText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    answersContainer: {
        flex: 1,
    },
    answerButton: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    nextButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default QuizScreen;