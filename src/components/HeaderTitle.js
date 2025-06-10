import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function HeaderTitle({ title }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/header-icon.png')}
        style={styles.icon}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HeaderTitle;