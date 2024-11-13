// src/styles/monthlyStatics/monthlyStaticsStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFD38B',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roundedContainer: {
    backgroundColor: '#FFF7EA',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    marginTop: 20,
    minHeight: height, // 화면 높이 설정
  },
});
