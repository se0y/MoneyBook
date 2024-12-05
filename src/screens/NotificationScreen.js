import React, { useState, useEffect } from 'react';
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

import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // UserContext 가져오기

const { width } = Dimensions.get('window');

const NotificationScreen = () => {
  const [budgetSetting, setBudgetSetting] = useState(0); // 설정된 예산
  const [totalOutcome, setTotalOutcome] = useState(0); // 총 지출
  const [notifications, setNotifications] = useState([]); // 알림 메시지
  const [translateX] = useState(new Animated.Value(width)); // 애니메이션 초기값
  const navigation = useNavigation();

  const { userId } = useContext(UserContext); // userId 가져오기
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  // Firestore에서 데이터 가져오기 및 알림 생성
  const fetchBudgetAndOutcome = async () => {
    try {
      const userRef = firestore().collection('Users').doc(userId);

      // Budget 데이터 가져오기
      const budgetDoc = await userRef.collection('budget').doc(date).get();
      const budget = budgetDoc.exists ? budgetDoc.data().targetBudget || 0 : 0;
      setBudgetSetting(budget);
      console.log(`budget: ${budget}`);

      // Outcome 데이터 가져오기
      const userSnapshot = await userRef.get();
      const { availableDates } = userSnapshot.data() || {};
      const monthPrefix = date;
      let totalOutcome = 0;

      if (availableDates && Array.isArray(availableDates)) {
        const monthlyDates = availableDates.filter((d) => d.startsWith(monthPrefix));
        for (const day of monthlyDates) {
          const outcomeDoc = await userRef.collection(day).doc('outcome').get();
          if (outcomeDoc.exists) {
            const { transactions = {} } = outcomeDoc.data();
            totalOutcome += Object.values(transactions).reduce((sum, t) => sum + (t.money || 0), 0);
          }
        }
      }

      console.log(`totalOutcome: ${Math.abs(totalOutcome)}`);

      // 알림 생성
      generateNotifications(budget, Math.abs(totalOutcome));
    } catch (error) {
      console.error('데이터 가져오는 중 오류 발생:', error);
    }
  };

  // 알림 생성 로직
  const generateNotifications = (targetBudget, totalOutcome) => {
    const messages = [];
    const usagePercentage = targetBudget > 0
        ? Math.round((totalOutcome / targetBudget) * 100 * 100) / 100
        : 0;
    console.log(usagePercentage);

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    if (usagePercentage >= 100) {
      messages.push({ id: 1, message: `${formattedDate}: 설정 예산의 100%를 사용하셨습니다.` });
    }
    if (usagePercentage >= 70) {
      messages.push({ id: 2, message: `${formattedDate}: 설정 예산의 70%를 사용하셨습니다.` });
    }
    if (usagePercentage >= 50 && usagePercentage < 70) {
      messages.push({ id: 3, message: `${formattedDate}: 설정 예산의 50%를 사용하셨습니다.` });
    }

    setNotifications(messages);
  };

  // Firestore 실시간 구독 설정
  useEffect(() => {
    const userRef = firestore().collection('Users').doc(userId);
    const budgetRef = userRef.collection('budget').doc(date);

    const unsubscribe = budgetRef.onSnapshot(async () => {
      await fetchBudgetAndOutcome();
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  // 애니메이션 효과
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0, // 화면에 나타남
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // 알림 삭제
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
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
                    <Text style={styles.message}>{notification.message}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  animatedContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '80%',
    backgroundColor: '#FFF',
    elevation: 5,
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
  message: {
    fontSize: 16,
    color: '#4B3D3A',
  },
  noNotifications: {
    fontSize: 16,
    color: '#A89A8D',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationScreen;
