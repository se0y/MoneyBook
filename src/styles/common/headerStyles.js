// src/styles/common/headerStyles

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // 가로로 정렬
    alignItems: 'center', // 세로 중앙 정렬
    paddingHorizontal: 20, // 좌우 여백
    paddingVertical: 20, // 상하 여백
    backgroundColor: '#FFD38B', // 헤더 배경색
  },
  menuIconContainer: {
    width: 40, // 터치 영역의 너비
    height: 40, // 터치 영역의 높이
    justifyContent: 'center', // 아이콘 수직 중앙 정렬
    alignItems: 'center', // 아이콘 수평 중앙 정렬
  },
  headerTitle: {
    justifyContent: 'center', // 아이콘 수직 중앙 정렬
    alignItems: 'center', // 아이콘 수평 중앙 정렬
    marginRight: 37,
    flex: 1, // 제목을 중앙에 위치하도록 설정
    fontSize: 18, // 텍스트 크기
    fontWeight: 'bold', // 굵은 글씨
    textAlign: 'center', // 중앙 정렬
    color: '#000', // 검은색 텍스트
  },
});

