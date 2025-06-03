import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native'

function HomeScreen({navigation}){
    function handleStartQuiz(){
        console.log("Navegando para a tela do Quiz...");
        navigation.navigate('Quiz');
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.texto} >Bem vindo ao NeuroQuiz</Text>
            <Text>This is the Home Screen</Text>
            <Button
                title="Iniciar Quiz"
                onPress={handleStartQuiz}
            />
        </View>
    )
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
    marginBottom: 16,
  },
})

export default HomeScreen;