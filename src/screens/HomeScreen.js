// src/screens/HomeScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import CustomButton from '../components/CustomButton';
import { generateQuizFromText } from '../services/openai';

function HomeScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (inputText.trim().length < 50) {
      Alert.alert("Texto muito curto", "Por favor, insira um texto com pelo menos 50 caracteres para gerar um quiz.");
      return;
    }

    Keyboard.dismiss(); 
    setIsLoading(true); 

    try {
      const quizData = await generateQuizFromText(inputText);

      navigation.navigate('Quiz', { quizData: quizData });

    } catch (error) {
      console.error("Erro ao gerar o quiz:", error);
      Alert.alert("Erro", "Não foi possível gerar o quiz. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Insira o texto para o seu quiz</Text>

          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Cole seu texto de estudo aqui..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#FFFFFF" style={{ height: 50 }} />
          ) : (
            <CustomButton
              title="Gerar Quiz com IA"
              onPress={handleGenerateQuiz}
              style={{height: 50}} 
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  textInput: {
    height: 200, 
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});

export default HomeScreen;