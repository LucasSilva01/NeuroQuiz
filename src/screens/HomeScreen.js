import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ImageBackground } from 'react-native';

function HomeScreen({ navigation }) {

  function handleStartQuiz() {

    navigation.navigate('Quiz', { quizId: 'q1' });
  }

  function handleGoToHistory() {
    navigation.navigate('History');
  }

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao NeuroQuiz!</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Iniciar Quiz de Informática" 
            onPress={handleStartQuiz}
          />
          <Button
            title="Ver Histórico"
            onPress={handleGoToHistory}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'space-around',
    height: 100,
  }
});

export default HomeScreen;