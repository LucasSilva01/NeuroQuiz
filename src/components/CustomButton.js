import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;