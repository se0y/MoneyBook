// src/styles/ageCompare/inputFieldStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20, // 필드 간 간격
    justifyContent: 'center', // 세로 방향으로 가운데 정렬
    alignItems: 'center', // 가로 방향으로 가운데 정렬
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row', // 아이콘과 입력 필드를 가로로 배치
    alignItems: 'center', // 아이템들을 수직으로 가운데 정렬
    justifyContent: 'center', // 아이템들을 가로로 가운데 정렬
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F1DFC3', // 배경색
    paddingHorizontal: 10, // 수평 여백 추가
    height: 41, // 입력 필드 높이
    width: 350, // 고정된 너비
  },
  input: {
    flex: 1, // 입력 필드가 가용 공간을 차지
    fontSize: 16,
    color: '#333', // 입력 텍스트 색상
    padding: 5, // 입력 필드 내부 여백
  },
});
