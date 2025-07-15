import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';

function HistoryDetailScreen({ route }) {
  const { historyItem } = route.params;

  if (!historyItem || !historyItem.quiz) {
    return (
      <ScreenBackground>
        <View style={styles.container}>
          <Text style={styles.errorText}>Erro: Não foi possível carregar os detalhes.</Text>
        </View>
      </ScreenBackground>
    );
  }

  const quiz = historyItem.quiz;

  const getAnswerStyleForDetail = (question, answer) => {
    const style = {
      container: { ...styles.answerContainer },
      text: { ...styles.answerText }
    };
    const userAnswer = historyItem.userAnswers.find(ua => ua.questionId === question.id);
    const userSelectedThisAnswer = userAnswer?.selectedAnswerId === answer.id;

    if (answer.isCorrect) {
      style.container.backgroundColor = '#d4edda'; // Verde
      style.container.borderColor = '#c3e6cb';
      style.text.fontWeight = 'bold';
    } else if (userSelectedThisAnswer) {
      style.container.backgroundColor = '#f8d7da'; // Vermelho
      style.container.borderColor = '#f5c6cb';
    }
    return style;
  };

  const renderQuestionItem = ({ item: question }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
      {question.answers.map(answer => {
        const answerStyle = getAnswerStyleForDetail(question, answer);
        return (
          <View key={answer.id} style={answerStyle.container}>
            <Text style={answerStyle.text}>{answer.text}</Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <ScreenBackground>
      <FlatList
        data={quiz.questions}
        keyExtractor={question => question.id}
        renderItem={renderQuestionItem}
        ListHeaderComponent={() => <Text style={styles.headerTitle}>{quiz.title}</Text>}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  errorText: { fontSize: 18, color: '#FFFFFF', textAlign: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#FFFFFF', paddingHorizontal: 16 },
  questionContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 8, padding: 16, marginBottom: 16, marginHorizontal: 10 },
  questionText: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  answerContainer: { padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginBottom: 8 },
  correctAnswer: { backgroundColor: '#d4edda', borderColor: '#c3e6cb' },
  answerText: { fontSize: 16, color: '#333' },
  correctAnswerText: { fontSize: 16, fontWeight: 'bold', color: '#155724' },
});

export default HistoryDetailScreen;