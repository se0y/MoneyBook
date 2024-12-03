import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import MonthlyStatics from './src/screens/MonthlyStatics';
import AgeCompare from './src/screens/AgeCompare';
import MenuBar from './src/screens/MenuBar';
import NotificationScreen from './src/screens/NotificationScreen'
import { PermissionsAndroid, Alert } from 'react-native';
import CalendarPage from './src/screens/CalendarPage';
import { MonthlyStaticsProvider } from './src/context/MonthlyStaticsContext'; // 가정된 context 파일
import { request, PERMISSIONS } from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import { UserProvider } from './src/context/UserContext'; // UserProvider 가져오기

//import firebase from '@react-native-firebase/app';
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {

  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, // SMS 수신 권한 요청
        {
          title: "SMS Permission", // 권한 요청 다이얼로그 제목
          message: "This app needs access to your SMS messages to parse them.", // 권한 설명
          buttonNeutral: "Ask Me Later", // 나중에 물어보기 버튼
          buttonNegative: "Cancel", // 취소 버튼
          buttonPositive: "OK", // 승인 버튼
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true); // 권한 승인 시 상태 업데이트
      } else {
        Alert.alert("Permission Denied", "SMS permission is required to test.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 권한 요청
    requestPermission();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions = {{headerShown : false}}>

          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
          
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: '회원가입'}}/>
          
          <Stack.Screen name="Success" component={SuccessScreen} options={{title: '로그인 성공'}}/>
          
          {/* 캘린더 페이지 */}
          <Stack.Screen
            name="Calendar"
            component={CalendarPage} // 컴포넌트 참조 전달
            options={{
              animation: 'slide_from_right', // 오른쪽에서 왼쪽으로 슬라이드
            }}
          />

          {/* 월별 통계 페이지 */}
          <Stack.Screen
            name="MonthlyStatics"
            component={MonthlyStatics} // 컴포넌트 참조 전달
            options={{
              animation: 'slide_from_right', // 오른쪽에서 왼쪽으로 슬라이드
            }}
          />

          {/* 연령대별 지출 비교 페이지 */}
          <Stack.Screen
            name="AgeCompare"
            component={AgeCompare}
            options={{
              animation: 'slide_from_right', // 오른쪽에서 왼쪽으로 슬라이드
            }}
          />

           {/* 알림 페이지 */}
           <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
               presentation: 'transparentModal', // 모달로 설정
               animation: 'slide_from_right', // 오른쪽에서 왼쪽으로 슬라이드
               }}
           />

          {/* 메뉴 페이지 */}
          <Stack.Screen
            name="Menu"
            component={MenuBar}
            options={{
              presentation: 'transparentModal', // 모달로 설정
              animation: 'slide_from_left', // 왼쪽에서 오른쪽으로 슬라이드
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

