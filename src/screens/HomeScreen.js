import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

function HomeScreen({ navigation }) {

  function handleStartQuiz() {
    navigation.navigate('Quiz');
  }


  function handleGoToHistory() {
    navigation.navigate('History'); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texto}>Bem-vindo ao NeuroQuiz!</Text>
      <Text>Esta é a tela inicial.</Text>


      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar Quiz"
          onPress={handleStartQuiz}
        />

        <Button
          title="Ver Histórico"
          onPress={handleGoToHistory}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24, 
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'space-around',
    height: 100,
  }
});

export default HomeScreen;