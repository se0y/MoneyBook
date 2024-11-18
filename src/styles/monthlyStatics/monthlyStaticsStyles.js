// src/styles/monthlyStatics/monthlyStaticsStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#FFD38B',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
  roundedContainer: {
    backgroundColor: '#FFF7EA',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
    marginTop: 20,
    minHeight: height, // 화면 높이 설정
  },
  lineIcon: {
      marginHorizontal: 10, // 좌우 여백 추가로 AmountSummary와 간격 유지
    },
});
