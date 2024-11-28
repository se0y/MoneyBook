// FloatingButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FloatingButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#337D69',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: '#FFF', fontSize: 30 },
});

export default FloatingButton;