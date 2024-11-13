// src/styles/monthlyStatics/budgetProgressBarStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
    position: 'relative',
    overflow: 'hidden', // 둥근 모서리로 인해 바깥 텍스트가 잘리지 않도록 설정
  },
  progressBar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
  },
  percentageText: {
    position: 'absolute',
    left: 15, // 원하는 위치로 조정
    fontWeight: 'bold',
    color: '#F1FFF3',
    zIndex: 1, // ProgressBar 위에 텍스트가 표시되도록 설정
  },
  totalAmountText: {
    position: 'absolute',
    right: 15, // 오른쪽으로 이동
    color: '#093030',
    fontWeight: 'bold',
    zIndex: 1,
  },
});
