import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionsAndroid, Alert } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';
import { UserProvider } from './src/context/UserContext'; // userId 가져오기

// 페이지
import HomeScreen from './src/screens/HomeScreen'; // 홈
import LoginScreen from './src/screens/LoginScreen'; // 로그인
import SignUpScreen from './src/screens/SignUpScreen'; // 회원가입
import SuccessScreen from './src/screens/SuccessScreen'; // 로그인 성공
import MonthlyStatics from './src/screens/MonthlyStatics'; // 월별 통계
import AgeCompare from './src/screens/AgeCompare'; // 또래 지출
import MenuBar from './src/screens/MenuBar'; // 메뉴바
import NotificationScreen from './src/screens/NotificationScreen'; // 알림
import Category from './src/screens/Category'; // 카테고리
import CategoryDetails from './src/screens/CategoryDetails'; // 카테고리 디테일
import BudgetSettingScreen from './src/screens/BudgetSettingScreen'; // 예산 설정
import CalendarPage from './src/screens/CalendarPage'; // 캘린더


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
            component={MonthlyStatics}
            options={{
              animation: 'slide_from_right',
            }}
          />

          {/* 연령대별 지출 비교 페이지 */}
          <Stack.Screen
            name="AgeCompare"
            component={AgeCompare}
            options={{
              animation: 'slide_from_right',
            }}
          />

           {/* 알림 페이지 */}
           <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{
               presentation: 'transparentModal',
               animation: 'slide_from_right',
               }}
           />

          {/* 메뉴 페이지 */}
          <Stack.Screen
            name="Menu"
            component={MenuBar}
            options={{
              presentation: 'transparentModal',
              animation: 'slide_from_left',
            }}
          />

          {/* 예산 설정 페이지 */}
          <Stack.Screen
              name="BudgetSettingScreen"
              component={BudgetSettingScreen}
              options={{
               presentation: 'transparentModal',
               animation: 'slide_from_right',
               }}
           />

          {/* 카테고리 페이지 */}
          <Stack.Screen
            name = "Category"
            component={Category}
            options = {{
              presentation: 'transparentModal',
              animation: 'slide_from_right',
            }}
          />

          {/* 카테고리 디테일 페이지 */}
          <Stack.Screen
            name = "CategoryDetails"
            component={CategoryDetails}
            options = {{
              presentation: 'transparentModal',
              animation: 'slide_from_right',
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;