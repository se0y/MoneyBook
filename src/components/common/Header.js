// scr/components/common/Header.js
// 헤더

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from '../common/MenuIcon';
import AlarmIcon from '../common/AlarmIcon'; // 알람 아이콘 import
import styles from '../../styles/common/headerStyles';

const Header = ({ title, backgroundColor, isCalendar, marginRight }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
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
      <Text style={[styles.headerTitle, { marginRight }]}>{title}</Text>

      {/* isCalendar가 true일 때 알람 아이콘 렌더링 */}
      {isCalendar && (
        <TouchableOpacity
          hitSlop={{ top: 40, left: 20, right: 40, bottom: 40 }} // 터치 영역 확장
          style={styles.menuIconContainer} // 아이콘 크기를 제한하는 스타일
          onPress={() => {
            console.log('알람 아이콘 클릭됨');
            navigation.navigate('Alarm'); // 알람 페이지로 이동
          }}
        >
          <AlarmIcon /> {/* 알람 아이콘 */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

