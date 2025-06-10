import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { mockHistory, mockQuizzes } from '../data/mocks';

function HistoryDetailScreen({ route }) {

  const { historyId } = route.params;
  const historyItem = mockHistory.find(item => item.id === historyId);
  const quiz = mockQuizzes.find(q => q.title === historyItem.quizTitle);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text>Quiz não encontrado!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quiz.questions}
        keyExtractor={question => question.id}
        renderItem={({ item: question }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.text}</Text>

            {question.answers.map(answer => (
              <View 
                key={answer.id} 

                style={[styles.answerContainer, answer.isCorrect && styles.correctAnswer]}
              >
                <Text style={answer.isCorrect ? styles.correctAnswerText : styles.answerText}>
                  {answer.text}
                </Text>
              </View>
            ))}
          </View>
        )}

        ListHeaderComponent={() => <Text style={styles.headerTitle}>{quiz.title}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    questionContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    answerContainer: {
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8,
    },
    correctAnswer: {
        backgroundColor: '#d4edda', 
        borderColor: '#c3e6cb',
    },
    answerText: {
        fontSize: 16,
    },
    correctAnswerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#155724', 
    }
});

export default HistoryDetailScreen;