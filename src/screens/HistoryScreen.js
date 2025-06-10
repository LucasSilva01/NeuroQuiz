import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
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
  const [displayHistory, setDisplayHistory] = useState(mockHistory);

  useEffect(() => {
    if (isFocused) {
      setDisplayHistory([...mockHistory]); 
    }
  }, [isFocused]);

  const handleItemPress = (item) => {
    navigation.navigate('HistoryDetail', { historyId: item.id });
  };

  const handleDelete = (itemToDelete) => {
    Alert.alert(
        "Excluir Histórico",
        `Tem certeza que deseja excluir o quiz "${itemToDelete.quizTitle}"?`,
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Excluir",
                onPress: () => {
                    deleteHistoryItem(itemToDelete.id);
                    setDisplayHistory(currentList => 
                        currentList.filter(item => item.id !== itemToDelete.id)
                    );
                },
                style: "destructive"
            }
        ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayHistory}
        renderItem={({ item }) => ( 
            <HistoryItem 
                title={item.quizTitle} 
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemDate: { fontSize: 12, color: '#666' },
    scoreContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemScore: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
    deleteButton: {
        marginLeft: 15,
        padding: 5,
    },
    deleteButtonText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
});

export default HistoryScreen;