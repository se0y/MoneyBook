import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faChartBar,
  faUsers,
  faWallet,
  faThList,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const MenuScreen = () => {
  const navigation = useNavigation(); // navigation 객체 가져오기

  console.log('MenuScreen loaded'); // MenuScreen 로드 확인
    console.log('Navigation object:', navigation); // navigation 객체 확인

    const handleMenuClick = (route) => {
      console.log(`Navigating to ${route}`); // 네비게이션 경로 로그
      navigation.navigate(route);
    };

  return (
    <View style={styles.menuContainer}>
      {/* 상단 사용자 정보 */}
      <View style={styles.header}>
        <FontAwesomeIcon icon={faUsers} size={40} color="#fff" style={styles.icon} />
        <Text style={styles.userText}>안녕하세요. ○○님</Text>
        <Text style={styles.userSubText}>이번 달 목표 금액의 10%를 사용하셨어요</Text>
      </View>

      {/* 메뉴 아이템 목록 */}
      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('Calendar')}>
          <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#fff" />
          <Text style={styles.menuText}>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('MonthlyStatics')}>
          <FontAwesomeIcon icon={faChartBar} size={24} color="#fff" />
          <Text style={styles.menuText}>나의 월별 통계</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('AgeCompare')}>
          <FontAwesomeIcon icon={faUsers} size={24} color="#fff" />
          <Text style={styles.menuText}>연령대별 지출 비교</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('BudgetSettings')}>
          <FontAwesomeIcon icon={faWallet} size={24} color="#fff" />
          <Text style={styles.menuText}>이번 달 예산 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('CategoryCheck')}>
          <FontAwesomeIcon icon={faThList} size={24} color="#fff" />
          <Text style={styles.menuText}>카테고리별 확인</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 로그아웃 */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => handleMenuClick('Logout')}>
        <FontAwesomeIcon icon={faSignOutAlt} size={24} color="#fff" />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#276749',
    width: '70%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  userSubText: {
    fontSize: 14,
    color: '#d9f5e5',
    textAlign: 'center',
    marginTop: 5,
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
});

export default MenuScreen;
