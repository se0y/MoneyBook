// src/styles/common/amountDetailStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  compareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  compareItem: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  compareLabel: {
    fontSize: 14,
    color: '#6D6D6D',
    marginBottom: 5,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A4F4B',
    marginBottom: 5,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E57373',
    marginBottom: 5,
  },
  compareChange: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  blur: {
    opacity: 0.3,
  },
});