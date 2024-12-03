import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions = {{headerShown : false}}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: '회원가입'}}/>
                <Stack.Screen name="Success" component={SuccessScreen} options={{title: '로그인 성공'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


{/* 로그인 성공 후 Calendar 화면으로 이동 */}
//<Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: '캘린더' }} />               
{/* MenuBar에서 예산 설정 화면으로 이동 */}
//<Stack.Screen name="BudgetSettings" component={BudgetSettings} options={{ title: '이번 달 예산 설정' }} />
