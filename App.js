/*
import React, { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    // 알림 권한 요청
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('알림 권한이 허용되었습니다.');
      } else {
        Alert.alert('알림 권한이 필요합니다.');
      }
    };

    requestUserPermission();

    // FCM 디바이스 토큰 가져오기
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM 디바이스 토큰:', token);
    };

    getToken();

    // 메시지 수신 처리
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM 메시지 수신:', remoteMessage);
      Alert.alert('새로운 알림!', remoteMessage.notification.body);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>FCM 테스트 앱</Text>
    </View>
  );
};

export default App;
*/