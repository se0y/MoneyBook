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
import NotificationScreen from './src/screens/NotificationScreen';
import Category from './src/screens/Category';
import CategoryDetails from './src/screens/CategoryDetails';
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
            initialParams={{ userName: '홍길동', percent: 25 }} // 기본 매개변수 전달
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


//문자 읽어오는 테스트 코드
// import React, { useEffect } from "react";
// import { View, Text, PermissionsAndroid, Alert } from "react-native";
// import SmsListener from "react-native-android-sms-listener";

// const App = () => {
//   useEffect(() => {
//     // SMS 권한 요청
//     const requestPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
//           {
//             title: "SMS Permission",
//             message: "This app needs access to your SMS messages to parse them.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK",
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert("Permission Denied", "SMS permission is required to test.");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestPermission();

//     // SMS 리스너 설정
//     const subscription = SmsListener.addListener((message) => {
//       console.log("Received SMS: ", message.body);
//       Alert.alert("New SMS Received", message.body);
//     });

//     // 컴포넌트 언마운트 시 리스너 제거
//     return () => subscription.remove();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//         Waiting for SMS...
//       </Text>
//       <Text style={{ marginTop: 10, fontSize: 14, color: "#555" }}>
//         Send an SMS to the emulator to test.
//       </Text>
//     </View>
//   );
// };

// export default App;


// 파이어베이스 데이터 추가 코드
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//     const [users, setUsers] = useState([]);

//     // Firestore에 데이터 추가
//     const addUser = async () => {
//       try {
//           // Firestore에서 특정 사용자 문서 추가
//           const userRef = firestore().collection('Users').doc('서연');

//           // 사용자 기본 정보 저장
//           await userRef.set({
//               name: '서연',
//               email: 'example@hansung.ac.kr',
//               phoneNumber: '010-1111-2222',
//               birth: '2000/01/01',
//               password: 'hansung',
//           });

//           // 예산 하위 컬렉션에 데이터 추가
//           await userRef.collection('budget').doc('2024-11').set({
//               targetBudget: 500000, // 목표 예산
//           });

//           // 2024-11-19 하위 컬렉션 추가
//           const nov19Ref = userRef.collection('2024-11-19');
//           await nov19Ref.doc('income').set({
//               money: 35000,
//               memo: '교통비 환급',
//               time: '17:56',
//               category: '기타',
//           });
//           await nov19Ref.doc('outcome').set({
//               money: -8000,
//               memo: '세븐일레븐',
//               time: '21:03',
//               category: '편의점',
//           });

//           // 2024-11-22 하위 컬렉션 추가
//           const nov22Ref = userRef.collection('2024-11-22');
//           await nov22Ref.doc('income').set({
//               money: 50000,
//               memo: '급여',
//               time: '09:00',
//               category: '이체',
//           });
//           await nov22Ref.doc('outcome').set({
//               money: -15000,
//               memo: '유니클로',
//               time: '15:40',
//               category: '쇼핑',
//           });

//           console.log('User and budget data added!');
//           Alert.alert('성공', '데이터가 성공적으로 추가되었습니다.');
//         } catch (error) {
//             console.error('Error adding user: ', error);
//             Alert.alert('오류', '데이터 추가에 실패했습니다.');
//         }
//     };

//     // Firestore에서 모든 사용자 조회
//     const fetchUsers = async () => {
//         try {
//             const snapshot = await firestore().collection('Users').get();
//             const fetchedUsers = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             console.log('Fetched users:', fetchedUsers);
//             setUsers(fetchedUsers);
//             Alert.alert('조회 완료', `사용자 수: ${fetchedUsers.length}`);
//         } catch (error) {
//             console.error('Error fetching users: ', error);
//             Alert.alert('오류', '사용자 데이터를 가져오는 데 실패했습니다.');
//         }
//     };

//     // 특정 사용자 조회
//     const fetchSpecificUser = async () => {
//         try {
//             const userDoc = await firestore().collection('Users').doc('ABC').get(); // 'ABC'는 테스트용 문서 ID
//             if (userDoc.exists) {
//                 console.log('Fetched user:', userDoc.data());
//                 Alert.alert('조회 완료', `사용자: ${JSON.stringify(userDoc.data())}`);
//             } else {
//                 Alert.alert('오류', '해당 사용자를 찾을 수 없습니다.');
//             }
//         } catch (error) {
//             console.error('Error fetching specific user: ', error);
//             Alert.alert('오류', '특정 사용자 데이터를 가져오는 데 실패했습니다.');
//         }
//     };

//     useEffect(() => {
//         // 앱 실행 시 초기 사용자 데이터 가져오기
//         fetchUsers();
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Firestore 테스트</Text>

//             <TouchableOpacity style={styles.button} onPress={addUser}>
//                 <Text style={styles.buttonText}>사용자 추가</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={fetchUsers}>
//                 <Text style={styles.buttonText}>모든 사용자 조회</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={fetchSpecificUser}>
//                 <Text style={styles.buttonText}>특정 사용자 조회</Text>
//             </TouchableOpacity>

//             <View style={styles.userList}>
//                 {users.map(user => (
//                     <Text key={user.id} style={styles.userText}>
//                         {user.name} - {user.age}
//                     </Text>
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5F5F5',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: '#3D5C7A',
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 25,
//         marginVertical: 10,
//     },
//     buttonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     userList: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     userText: {
//         fontSize: 16,
//         marginVertical: 5,
//     },
// });

// export default App;

// 파이어베이스 연동 코드
// import React, { useEffect } from 'react';
// import { Button, View, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import { firebase } from '@react-native-firebase/app';

// const App = () => {
//   useEffect(() => {
//     // Firebase 초기화 확인
//     if (firebase.apps.length === 0) {
//       console.error('Firebase 초기화 실패');
//     } else {
//       console.log('Firebase 초기화 성공');
//     }
//   }, []);

//   const testAnalytics = async () => {
//     try {
//       await analytics().logEvent('test_event', {
//         item: 'testItem',
//         description: 'This is a test event',
//       });
//       console.log('Firebase Analytics 이벤트 전송 성공');
//     } catch (error) {
//       console.error('Firebase Analytics 이벤트 전송 실패:', error);
//     }
//   };

//   const testAuthentication = async () => {
//     try {
//       const userCredential = await auth().signInAnonymously();
//       console.log('익명 로그인 성공:', userCredential.user.uid);
//     } catch (error) {
//       console.error('익명 로그인 실패:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Firebase 테스트</Text>
//       <Button title="Test Analytics" onPress={testAnalytics} />
//       <Button title="Test Authentication" onPress={testAuthentication} />
//     </View>
//   );
// };

// export default App;