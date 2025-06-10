import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

function QuizResultScreen({ route, navigation }) {
  const { score, totalQuestions } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz Finalizado!</Text>
      <Text style={styles.resultText}>
        Você acertou {score} de {totalQuestions} perguntas!
      </Text>
      <Button
        title="Voltar para o Início"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    marginBottom: 40,
  },
});

export default QuizResultScreen;