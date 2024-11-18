import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonthlyStatics from './src/screens/MonthlyStatics';
import AgeCompare from './src/screens/AgeCompare';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* 월별 통계 페이지 */}
        <Stack.Screen
          name="MonthlyStatics"
          component={MonthlyStatics}
          options={{ headerShown: false }}
        />

        {/* 연령대별 지출 비교 페이지 */}
        <Stack.Screen
          name="AgeCompare"
          component={AgeCompare}
          options={{ headerShown: false }}
        />

        {/* 메뉴 페이지 */}
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerShown: true,
            title: '메뉴',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
