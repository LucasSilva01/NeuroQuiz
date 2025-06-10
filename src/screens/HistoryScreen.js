import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import { mockHistory } from '../data/mocks';


const HistoryItem = ({ title, date, score, onPress }) => (

  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDate}>{date}</Text>
    </View>
    <Text style={styles.itemScore}>{score}%</Text>
  </TouchableOpacity>
);


function HistoryScreen({ navigation }) {


  function handleItemPress(item) {

    navigation.navigate('HistoryDetail', { historyId: item.id });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockHistory}
        renderItem={({ item }) => (
          <HistoryItem
            title={item.quizTitle}
            date={item.date}
            score={item.score}
            onPress={() => handleItemPress(item)}
          />
        )}
        keyExtractor={item => item.id}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
  },
  itemScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  }
});

export default HistoryScreen;