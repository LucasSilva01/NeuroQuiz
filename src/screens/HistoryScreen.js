import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ScreenBackground from '../components/ScreenBackground';
import { mockHistory, deleteHistoryItem } from '../data/mocks';

const HistoryItem = ({ title, date, score, onPress, onDelete }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDate}>{date}</Text>
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

  useEffect(() => {
    if (isFocused) {
      setDisplayHistory([...mockHistory]); 
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
                onPress: () => {
                    deleteHistoryItem(itemToDelete.id);
                    setDisplayHistory(currentList => currentList.filter(item => item.id !== itemToDelete.id));
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
            </View>
        )}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
    itemContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20, marginVertical: 8, marginHorizontal: 16, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    itemDate: { fontSize: 12, color: '#666' },
    scoreContainer: { flexDirection: 'row', alignItems: 'center' },
    itemScore: { fontSize: 20, fontWeight: 'bold', color: '#155724' },
    deleteButton: { marginLeft: 15, padding: 5 },
    deleteButtonText: { fontSize: 18, color: 'red', fontWeight: 'bold' },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontSize: 18, color: '#FFF', fontWeight: 'bold', textShadowColor: '#000', textShadowRadius: 2 },
});

export default HistoryScreen;