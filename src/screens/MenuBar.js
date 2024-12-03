// src/screens/MenuBar.js
// 메뉴바 페이지

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
import { UserContext } from '../context/UserContext'; // UserContext 가져오기
import firestore from '@react-native-firebase/firestore';

const MenuBar = ({ route }) => {
  const { userId } = useContext(UserContext); // userId 가져오기
  const navigation = useNavigation(); // navigation 객체 가져오기

  const [budget, setBudget] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

  // 메뉴바에 표시를 위한 지출 데이터 조회
  const fetchMonthlyOutcomeData = async () => {
    let totalOutcome = 0;
    try {
      const userRef = firestore().collection('Users').doc(userId);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) return 0;

      const { availableDates } = userSnapshot.data();
      if (!availableDates || !Array.isArray(availableDates)) return 0;

      const monthPrefix = `${currentYear}-${currentMonth}`;
      const monthlyDates = availableDates.filter((date) => date.startsWith(monthPrefix));

      for (const date of monthlyDates) {
        const doc = await userRef.collection(date).doc('outcome').get();
        if (doc.exists) {
          const transactions = doc.data().transactions || {};
          totalOutcome += Object.values(transactions).reduce((sum, t) => sum + (t.money || 0), 0);
        }
      }

      setOutcome(totalOutcome);
    } catch (error) {
      console.error('Error fetching monthly outcome:', error);
      return 0;
    }
  };

  // 메뉴바에 표시를 위한 예산 데이터 조회
  const fetchMonthlyBudget = async () => {
    try {
      const targetPrefix = `${currentYear}-${currentMonth}`;
      const userRef = firestore().collection('Users').doc(userId);
      const budgetDoc = await userRef.collection('budget').doc(targetPrefix).get();

      setBudget(budgetDoc.exists ? budgetDoc.data().targetBudget || 0 : 0);
    } catch (error) {
      console.error('Error fetching monthly budget:', error);
      return 0;
    }
  };

  // 퍼센트 업데이트
  const updateBudgetAndOutcome = () => {
    const positiveOutcome = Math.abs(outcome); // outcome을 양수로 변환
    const calculatedPercentage =
      budget === 0 ? 0 : Math.min((positiveOutcome / budget) * 100, 100);
    setPercentage(Number(calculatedPercentage.toFixed(2))); // 소수점 두 자리로 제한
  };

  // 화면 로드 시 호출
  useEffect(() => {
    const fetchData = async () => {
      await fetchMonthlyOutcomeData();
      await fetchMonthlyBudget();
      updateBudgetAndOutcome();
    };
    fetchData();
  }, [outcome, budget]); // outcome과 budget이 변경될 때마다 실행

  const handleMenuClick = (route) => {
    console.log(`${route} 페이지로 이동`); // 네비게이션 경로 로그
    navigation.navigate(route); // 화면 전환
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
              <Text style={styles.userText}>안녕하세요. {userId}님</Text>
              <Text style={styles.userSubText}>
                이번 달 목표 금액의 {percentage}%를 사용하셨어요
              </Text>
            </View>

            {/* 메뉴 아이템 목록 */}
            <View style={styles.menuList}>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuClick('Calendar')}>
                <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#fff" />
                <Text style={styles.menuText}>캘린더</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuClick('MonthlyStatics')}
              >
                <FontAwesomeIcon icon={faChartBar} size={24} color="#fff" />
                <Text style={styles.menuText}>나의 월별 통계</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuClick('AgeCompare')}
              >
                <FontAwesomeIcon icon={faUsers} size={24} color="#fff" />
                <Text style={styles.menuText}>연령대별 지출 비교</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuClick('BudgetSettings')}
              >
                <FontAwesomeIcon icon={faWallet} size={24} color="#fff" />
                <Text style={styles.menuText}>이번 달 예산 설정</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuClick('CategoryCheck')}
              >
                <FontAwesomeIcon icon={faThList} size={24} color="#fff" />
                <Text style={styles.menuText}>카테고리별 확인</Text>
              </TouchableOpacity>
            </View>

            {/* 하단 로그아웃 */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleMenuClick('Logout')}
            >
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
