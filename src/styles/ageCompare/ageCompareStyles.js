import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD38B',
  },
  scrollContent: {
    flexGrow: 1, // 스크롤 가능한 콘텐츠 설정
  },
  roundedContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7EA',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20, // 헤더와 간격
  },
  chartWrapper: {
    paddingLeft: 20,
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: 180,
    height: 50,
    backgroundColor: '#FFD38B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#5A5A5A',
  },
});
