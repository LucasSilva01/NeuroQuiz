import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';

function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  }
});

export default AboutScreen;