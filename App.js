

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="Home">
       
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'NeuroQuiz' }} 
        />
        <Stack.Screen
          name = "Quiz"
          component={QuizScreen}
          options={{ title: 'Quiz em andamento'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;