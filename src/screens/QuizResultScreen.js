
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { addHistoryItemAsync } from '../services/database';
import CustomButton from '../components/CustomButton';
import ScreenBackground from '../components/ScreenBackground';

function QuizResultScreen({ route, navigation }) {
  const { score, quizData, userAnswers } = route.params;

  useEffect(() => {
    
    const newHistoryEntry = {
      id: `h${new Date().getTime()}`, 
      quiz: {
        id: quizData.id,
        title: quizData.title,
        questions: quizData.questions,
      },
      userAnswers: userAnswers,
      date: new Date().toISOString(), 
      score: Math.round((score / quizData.questions.length) * 100),
    };
    
    
    addHistoryItemAsync(newHistoryEntry)
      .catch(e => console.error("Erro ao salvar no BD:", e));
  }, []); 

  return (
    <ScreenBackground>
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Finalizado!</Text>
            <Text style={styles.resultText}>
                Você acertou {score} de {quizData.questions.length} perguntas!
            </Text>
            <CustomButton
                title="Voltar para o Início"
                
                onPress={() => navigation.popToTop()}
            />
        </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#FFF', 
    textAlign: 'center' 
  },
  resultText: { 
    fontSize: 20, 
    marginBottom: 40, 
    color: '#FFF', 
    textAlign: 'center' 
  },
});

export default QuizResultScreen;