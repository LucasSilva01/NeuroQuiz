import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { addHistoryItem } from '../data/mocks';

function QuizResultScreen({ route, navigation }) {
  const { score, totalQuestions, quizTitle } = route.params;


  useEffect(() => {
    const newHistoryEntry = {
      id: `h${new Date().getTime()}`, 
      quizTitle: quizTitle,
      date: new Date().toLocaleDateString('pt-BR'),
      score: Math.round((score / totalQuestions) * 100),
    };

    addHistoryItem(newHistoryEntry);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz Finalizado!</Text>
      <Text style={styles.resultText}>
        Você acertou {score} de {totalQuestions} perguntas!
      </Text>
      <Button
        title="Voltar para o Início"
        onPress={() => navigation.popToTop()} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... estilos continuam os mesmos
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  resultText: { fontSize: 20, marginBottom: 40 },
});

export default QuizResultScreen;