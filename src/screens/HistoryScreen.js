// src/screens/HistoryScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ScreenBackground from '../components/ScreenBackground';


import { getAllHistoryAsync, deleteHistoryItemAsync } from '../services/database';


const HistoryItem = ({ title, date, score, onPress, onDelete }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{title}</Text>
            {/* Formata a data para ser mais legível */}
            <Text style={styles.itemDate}>{new Date(date).toLocaleDateString('pt-BR')}</Text>
        </View>
        <View style={styles.scoreContainer}>
            <Text style={styles.itemScore}>{score}%</Text>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
);

function HistoryScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [displayHistory, setDisplayHistory] = useState([]);

 
  const loadHistory = async () => {
    try {
      const historyItems = await getAllHistoryAsync();
      setDisplayHistory(historyItems);
    } catch (error) {
      console.error("Erro ao carregar o histórico:", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    }
  };

  
  useEffect(() => {
    if (isFocused) {
      loadHistory(); 
    }
  }, [isFocused]);

  
  const handleItemPress = (item) => {
    navigation.navigate('HistoryDetail', { historyItem: item });
  };

  
  const handleDelete = (itemToDelete) => {
    Alert.alert(
        "Excluir Histórico",
        `Tem certeza que deseja excluir o quiz "${itemToDelete.quiz.title}"?`,
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                onPress: async () => {
                    try {
                      
                      await deleteHistoryItemAsync(itemToDelete.id);
                      
                      loadHistory();
                    } catch (error) {
                      console.error("Erro ao deletar item:", error);
                      Alert.alert("Erro", "Não foi possível excluir o item do histórico.");
                    }
                },
                style: "destructive"
            }
        ]
    );
  };

  return (
    <ScreenBackground>
      <FlatList
        data={displayHistory}
        renderItem={({ item }) => ( 
            <HistoryItem 
                title={item.quiz.title}
                date={item.date} 
                score={item.score} 
                onPress={() => handleItemPress(item)}
                onDelete={() => handleDelete(item)}
            /> 
        )}
        keyExtractor={item => item.id}
        
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Seu histórico está vazio.</Text>
                <Text style={styles.emptySubText}>Jogue um quiz para ver seus resultados aqui!</Text>
            </View>
        )}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    itemInfo: {
        flex: 1, 
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10, // Espaço entre o texto e a pontuação
    },
    itemScore: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#155724',
    },
    deleteButton: {
        marginLeft: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        color: '#c82333',
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptySubText: {
        fontSize: 14,
        color: '#ddd',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default HistoryScreen;