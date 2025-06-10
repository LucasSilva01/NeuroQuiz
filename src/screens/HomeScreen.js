import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

function HomeScreen({ navigation }) {
  function handleStartQuiz() {
    navigation.navigate('Quiz', { quizId: 'q1' });
  }

  function handleGoToHistory() {
    navigation.navigate('History');
  }
  function handleGoToAbout() {
    navigation.navigate('About');
  }

  return (
    <ImageBackground
      source={require('../assets/logo.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao NeuroQuiz!</Text>

        <TouchableOpacity style={styles.customButton} onPress={handleStartQuiz}>
          <Text style={styles.customButtonText}>Iniciar Quiz de Informática</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={handleGoToHistory}>
          <Text style={styles.customButtonText}>Ver Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButton} onPress={handleGoToAbout}>
          <Text style={styles.customButtonText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
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
        marginBottom: 295, 
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    customButton: {
        backgroundColor: '#007bff', 
        borderRadius: 8,
        width: '80%', 
        alignItems: 'center', 
        paddingVertical: 13,
        marginVertical: 10,
    },
    customButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;