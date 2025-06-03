import React from "react";
import { View, Text, StyleSheet } from "react-native";

function QuizScreen() {
    return(
        <View style = {styles.container}>
            <Text style = {styles.texto}>Esta é a Tela de Quiz</Text>
            <Text>Aqui as Perguntas aparecerão</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default QuizScreen;