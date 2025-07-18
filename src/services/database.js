
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@NeuroQuiz:history'; 

export const getAllHistoryAsync = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);

    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar histórico do AsyncStorage", e);
    return [];
  }
};

export const addHistoryItemAsync = async (item) => {
  try {
    const currentHistory = await getAllHistoryAsync();
    
    const newHistory = [item, ...currentHistory];
    const jsonValue = JSON.stringify(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar item no AsyncStorage", e);
  }
};

export const deleteHistoryItemAsync = async (id) => {
  try {
    const currentHistory = await getAllHistoryAsync();
    const newHistory = currentHistory.filter(item => item.id !== id);
    const jsonValue = JSON.stringify(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao deletar item do AsyncStorage", e);
  }
};