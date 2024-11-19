// scr/components/common/Header.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../common/MenuIcon';
import styles from '../../styles/common/headerStyles';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* 메뉴 아이콘 */}
      <TouchableOpacity
        hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }} // 터치 영역 확장
        style={styles.menuIconContainer} // 아이콘 크기를 제한하는 스타일
        onPress={() => {
          console.log('메뉴바 클릭됨');
          navigation.navigate('Menu');
        }}
      >
        <MenuIcon /> {/* 메뉴 아이콘 */}
      </TouchableOpacity>

      {/* 헤더 제목 */}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

