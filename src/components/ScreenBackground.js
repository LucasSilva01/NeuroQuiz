import React from 'react';
import { ImageBackground, StyleSheet, View, SafeAreaView } from 'react-native';

function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require('../assets/logo.png')} 
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>

          {children}
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  safeArea: {
    flex: 1,
  }
});

export default ScreenBackground;