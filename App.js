// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonthlyStatics from './src/screens/MonthlyStatics';
import AgeCompare from './src/screens/AgeCompare';
import MenuBar from './src/screens/MenuBar';
import { MonthlyStaticsProvider } from './src/context/MonthlyStaticsContext'; // Context 추가

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MonthlyStaticsProvider> {/* Context Provider로 감싸기 */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // 기본적으로 헤더를 숨김
          }}
        >
          {/* 월별 통계 페이지 */}
          <Stack.Screen
            name="MonthlyStatics"
            component={MonthlyStatics}
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
    </MonthlyStaticsProvider>
  );
};

export default App;
