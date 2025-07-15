import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import CustomButton from '../components/CustomButton';

function HomeScreen({ navigation }) {
  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.title}>NeuroQuiz</Text>
        <Text style={styles.subtitle}>Seu Assistente de Estudos com IA</Text>

        <View style={styles.buttonMenu}>
            <CustomButton
              title="Gerar Novo Quiz"
              onPress={() => navigation.navigate('Generate')}
            />
            <CustomButton
              title="Ver Histórico"
              onPress={() => navigation.navigate('History')}
            />
            <CustomButton
              title="Sobre"
              onPress={() => navigation.navigate('About')}
            />
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 48, // Título maior
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 60, // Espaço maior para os botões
  },
  buttonMenu: {
    width: '100%',
    alignItems: 'center',
  }
});

export default HomeScreen;