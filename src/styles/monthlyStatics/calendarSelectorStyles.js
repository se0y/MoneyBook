// src/styles/monthlyStatics/calendarSelectorStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  calendarContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 18,
    color: '#333333', // 기본 색상
  },
  disabledArrow: {
    backgroundColor: '#f0f0f0', // 버튼 배경색
    borderRadius: 10,
  },
  disabledArrowText: {
    color: '#cccccc', // 비활성화 상태의 회색 텍스트 색상
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  monthItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  selectedMonth: {
    backgroundColor: '#FFD580',
  },
  monthText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedMonthText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
