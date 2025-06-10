import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';

function AboutScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sobre o NeuroQuiz</Text>
        
        <Text style={styles.paragraph}>
          O NeuroQuiz é um projeto desenvolvido para a disciplina de Programação para Dispositivos Móveis.
        </Text>

        <Text style={styles.paragraph}>
          O objetivo principal do aplicativo é utilizar o poder da Inteligência Artificial para transformar qualquer texto fornecido pelo usuário em um quiz interativo. Isso facilita e agiliza o processo de estudo e revisão de conteúdo, eliminando a necessidade de criar perguntas manualmente.
        </Text>

        <Text style={styles.subtitle}>Tecnologias Utilizadas:</Text>
        <Text style={styles.listItem}>- React Native com Expo</Text>
        <Text style={styles.listItem}>- JavaScript</Text>
        <Text style={styles.listItem}>- React Navigation para a navegação</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Desenvolvido por: Lucas S.</Text>
          <Text style={styles.footerText}>Junho de 2025</Text>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'justify',
    marginBottom: 15,
    color: '#f0f0f0',
  },
  listItem: {
    fontSize: 17,
    lineHeight: 25,
    color: '#f0f0f0',
    marginLeft: 10,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#ccc',
  }
});

export default AboutScreen;