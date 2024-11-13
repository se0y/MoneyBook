// src/styles/monthlyStatics/monthlyChartStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 14,
    color: '#333',
    position: 'absolute',
    top: -10,
    textAlign: 'center',
    width: 40,
    transform: [{ translateX: 0 }], // 막대의 중앙으로 이동
  },
});

export default styles;
