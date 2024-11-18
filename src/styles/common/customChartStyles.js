// src/styles/common/customChartStyles.js

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
  },
});

export default styles;
