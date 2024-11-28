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
