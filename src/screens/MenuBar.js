// src/screens/MenuBar.js
// 메뉴바 페이지

import React from 'react';
import { View, Text, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
import styles from '../styles/common/menuBarStyles.js';
import firestore from '@react-native-firebase/firestore';

 const MenuBar = ({ route }) => {
  const { userName, percent } = route.params; // 매개변수 접근
  const navigation = useNavigation(); // navigation 객체 가져오기

  const handleMenuClick = (route) => {
    if(route == 'Logout') {
      handleLogout();
    } else {
      console.log(`${route} 페이지로 이동`); // 네비게이션 경로 로그
      navigation.navigate(route); // 화면 전환
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "Cancel"
        },
        {
          text: "확인",
          onPress: async () => {
            try {
              navigation.reset({
                index: 0,
                routes: [{name : 'Home'}],
              });

              console.log('로그아웃 성공');
            } catch (error) {
              console.error('로그아웃 오류 : ', error);
              Alert.alert('오류 발생', '로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      {/* 메뉴 외부 클릭 시 닫힘 */}
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          {/* 메뉴 내부 클릭 방지 */}
          <View style={styles.menuContainer}>

            {/* 상단 사용자 정보 */}
            <View style={styles.header}>
              <FontAwesomeIcon icon={faUsers} size={40} color="#fff" style={styles.icon} />
              <Text style={styles.userText}>안녕하세요. {userName}님</Text>
              <Text style={styles.userSubText}>
                이번 달 목표 금액의 {percent}%를 사용하셨어요
              </Text>
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

              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('Category')}>
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
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MenuBar;
