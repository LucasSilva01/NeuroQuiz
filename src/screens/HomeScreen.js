// src/screens/HomeScreen.js

import React from 'react';
// 1. Importamos o 'ImageBackground' em vez de 'Image'
import { View, Text, StyleSheet, Button, SafeAreaView, ImageBackground } from 'react-native';

function HomeScreen({ navigation }) {

  function handleStartQuiz() {
    navigation.navigate('Quiz');
  }

  function handleGoToHistory() {
    navigation.navigate('History');
  }

  return (
    // 2. Usamos ImageBackground como o container principal de toda a tela
    <ImageBackground
      source={require('../assets/logo.png')} // Especifique sua imagem aqui
      resizeMode="cover" // Esta prop faz a imagem cobrir toda a tela sem distorcer
      style={styles.container} // Aplicamos o estilo de container a ele
    >
      {/* Colocamos uma View com fundo semitransparente por cima para melhorar a leitura */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao NeuroQuiz!</Text>

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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // 3. O estilo 'container' agora é para o ImageBackground
  container: {
    flex: 1, // Ocupa a tela toda
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 4. (Opcional, mas recomendado) Criamos um 'overlay' para escurecer
  // um pouco o fundo e facilitar a leitura do texto.
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo preto com 40% de opacidade
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  // 5. Estilo para o texto do título, agora em branco para contrastar
  title: {
    fontSize: 32, // Aumentei o tamanho
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor branca
    textAlign: 'center',
    marginBottom: 40, // Mais espaço
    // Efeito de sombra no texto para melhor legibilidade
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