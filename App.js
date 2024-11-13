// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MonthlyStatics from './src/screens/MonthlyStatics';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MonthlyStatics />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
