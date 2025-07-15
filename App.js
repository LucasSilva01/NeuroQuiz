import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HistoryDetailScreen from './src/screens/HistoryDetailScreen';
import QuizResultScreen from './src/screens/QuizResultScreen';
import AboutScreen from './src/screens/AboutScreen';
import GenerateScreen from './src/screens/GenerateScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Generate" component={GenerateScreen} options={{ title: 'Gerar Quiz', headerTitleAlign: 'center' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz em Andamento', headerTitleAlign: 'center' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico de Quizzes', headerTitleAlign: 'center' }} />
        <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} options={{ title: 'Detalhes do Quiz', headerTitleAlign: 'center' }} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ title: 'Resultado do Quiz', headerTitleAlign: 'center' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre o App', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;