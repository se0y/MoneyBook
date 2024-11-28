// src/styles/common/customChartStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center', // 텍스트와 차트를 모두 중앙 정렬
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center', // 차트를 가로로 중앙 정렬
    justifyContent: 'center', // 세로 중앙 정렬 (필요 시)
    flexDirection: 'row', // 차트를 중앙으로 배치
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

