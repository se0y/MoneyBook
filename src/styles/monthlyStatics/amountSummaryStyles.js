// src/styles/monthlyStatics/amountSummaryStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 가운데 정렬
    marginBottom: 5,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 25, // 중앙 배치를 위해 여백 조정
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    color: '#6D6D6D',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  income: {
    color: '#333333',
  },
  expand: {
    color: '#E97072',
  },
  divider: {
    marginHorizontal: 15, // 구분선 간격 조정
  }
});
