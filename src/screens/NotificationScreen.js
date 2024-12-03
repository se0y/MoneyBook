//NotificationScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const NotificationScreen = () => {
  const [budgetSetting, setBudgetSetting] = useState(0); // 설정된 예산
  const [totalOutcome, setTotalOutcome] = useState(0); // 총 지출
  const [notifications, setNotifications] = useState([]); // 알림 메시지 저장
  const [date] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
  const [translateX] = useState(new Animated.Value(width)); // Animation initial state
  const navigation = useNavigation();

  // Firestore 데이터 가져오기
  const getData = async () => {
    try {
      const BudgetDoc = await firestore().collection('Budget').doc(date).get(); // date로 데이터 가져오기
      if (BudgetDoc.exists) {
        const data = BudgetDoc.data();
        setBudgetSetting(data.BudgetSetting || 0); // budgetSetting 가져오기
        setTotalOutcome(data.totalOutcome || 0); // TotalOutcome 가져오기
        generateNotifications(data.BudgetSetting, data.totalOutcome); // 알림 생성
      } else {
        console.log('확인되는 문서 없음');
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

// 알림 메시지 생성
const generateNotifications = (budget, outcome) => {
  const messages = [];
  const usagePercentage = (outcome / budget) * 100;

  // 오늘 날짜 형식: YYYY.MM.DD
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  if (usagePercentage >= 90) {
    messages.push({ id: 1, message: `${date} 설정 예산의 90%를 사용하셨습니다.`, date: formattedDate });
  } 
  if (usagePercentage >= 50 && usagePercentage < 90) { // 90% 미만인 경우 추가 조건
    messages.push({ id: 2, message: `${date} 설정 예산의 50%를 사용하셨습니다.`, date: formattedDate });
  }

  setNotifications(messages);
};

  // 오늘 날짜에 해당하는 targetBudget 가져오기
  const getData = async () => {
    try {
      const userId = '서연'; // 현재 사용자 ID 설정
      const now = new Date();
      const currentYear = now.getFullYear(); // 현재 연도
      const currentMonth = String(now.getMonth() + 1).padStart(2, '0'); // 현재 월 (0부터 시작하므로 +1)
      const targetDate = `${currentYear}-${currentMonth}`; // Firestore 문서 이름과 일치하는 형식

      const userRef = firestore().collection('Users').doc(userId);
      const budgetDoc = await userRef.collection('budget').doc(targetDate).get(); // 오늘 날짜에 해당하는 데이터 가져오기

      if (budgetDoc.exists) {
        const data = budgetDoc.data();
        setBudgetSetting(data.targetBudget || 0); // targetBudget 가져오기
        generateNotifications(data.targetBudget); // 알림 생성
      } else {
        console.log(`${targetDate}에 대한 예산 문서가 없습니다.`);
      }
    } catch (error) {
      console.error('Firestore에서 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 오늘 날짜에 해당하는 outcome 합산 및 totalOutcome 저장
  const calculateTotalOutcome = async () => {
    try {
      const userId = '서연'; // 현재 사용자 ID 설정
      const now = new Date();
      const currentYear = now.getFullYear(); // 현재 연도
      const currentMonth = String(now.getMonth() + 1).padStart(2, '0'); // 현재 월
      const targetDate = `${currentYear}-${currentMonth}`; // Firestore 문서 이름과 일치하는 형식

      const userRef = firestore().collection('Users').doc(userId);
      const transactionsSnapshot = await userRef.collection('budget').doc(targetDate).get(); // 오늘 날짜에 해당하는 데이터 가져오기

      if (transactionsSnapshot.exists) {
        const transactions = transactionsSnapshot.data().transactions || []; // transactions 배열 가져오기

        // 모든 트랜잭션의 money 합산
        const totalOutcome = transactions.reduce((total, transaction) => total + transaction.money, 0);

        // Firestore에 totalOutcome 업데이트
        await userRef.collection('budget').doc(targetDate).update({ totalOutcome });

        console.log(`${targetDate}의 총 지출 합계는 ${totalOutcome}입니다.`);
        return totalOutcome;
      } else {
        console.log(`${targetDate}에 대한 트랜잭션 문서가 없습니다.`);
        return 0;
      }
    } catch (error) {
      console.error('총 지출 계산 중 오류 발생:', error);
      return 0;
    }
  };

  // 알림 메시지 생성
  const generateNotifications = (targetBudget, totalOutcome = 0) => {
    const messages = [];
    const usagePercentage = targetBudget > 0 ? (totalOutcome / targetBudget) * 100 : 0; // 예산이 0이 아닐 경우 계산

    // 오늘 날짜 형식: YYYY.MM.DD
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    if (usagePercentage >= 90) {
      messages.push({ id: 1, message: `${formattedDate}: 설정 예산의 90%를 사용하셨습니다.`, date: formattedDate });
    }
    if (usagePercentage >= 50 && usagePercentage < 90) { // 90% 미만인 경우 추가 조건
      messages.push({ id: 2, message: `${formattedDate}: 설정 예산의 50%를 사용하셨습니다.`, date: formattedDate });
    }

    setNotifications(messages);
  };

  // 초기 데이터 로드
  useEffect(() => {
    getData();
  }, []);

  // Start slide-in animation when screen loads
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: width * 0.2, // 80% of the screen width
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // 알림 삭제
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.container}>
            <Text style={styles.header}>알림 내역</Text>
            <ScrollView>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={styles.notificationBox}
                    onPress={() => handleDelete(notification.id)}
                  >
                    <Text style={styles.alert}>경고</Text>
                    <Text style={styles.message}>{notification.message}</Text>
                    <Text style={styles.date}>{notification.date}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noNotifications}>현재 알림이 없습니다.</Text>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    justifyContent: 'flex-end', // Align the notification screen to the right

  },
  animatedContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%', // 80% of the screen width
    backgroundColor: '#FFF',
    elevation: 5, // Shadow for the box
     borderRadius: 20,

  },
  container: {
    flex: 1,
    backgroundColor: '#D9C9B6',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B3D3A',
  },
  notificationBox: {
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  alert: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5A2B',
  },
  message: {
    fontSize: 16,
    color: '#4B3D3A',
  },
  date: {
    fontSize: 12,
    color: '#A89A8D',
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#8B5A2B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;

/*
  // 알림 생성 로직
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const tempNotifications = [];
    if (budget > 0) {
      const usagePercentage = (outcome / budget) * 100;
      if (usagePercentage >= 50 && usagePercentage < 90) {
        tempNotifications.push({
          id: '1', // 고유 ID
          message: `${date} 예산의 50%를 사용했습니다.`,
          date: `${date}`,
        });
      }
      if (usagePercentage >= 90) {
        tempNotifications.push({
          id: '2', // 고유 ID
          message: `${date} 예산의 90%를 사용했습니다.`,
          date: `${date}`,
        });
      }
    }
    setNotifications(tempNotifications);
  }, [budget, outcome, date]);
*/