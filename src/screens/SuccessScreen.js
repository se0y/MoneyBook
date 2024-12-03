import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UserContext'; // UserContext 가져오기

function HomeScreen({ navigation, route }) {
  const { userId, setUserId } = useContext(UserContext); // userId와 setUserId 가져오기
  const { email: userEmail } = route.params.user;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Calendar'); // 3초 후 CalendarPage로 이동
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userEmail) {
          throw new Error('이메일이 전달되지 않았습니다.');
        }

        const querySnapshot = await firestore()
          .collection('Users')
          .where('email', '==', userEmail)
          .get();

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();

          setUserId(userData.name || 'Unknown User'); // UserContext에 userId 저장
        } else {
          console.log('사용자 문서를 찾을 수 없습니다');
          setUserId('Unknown User');
        }
      } catch (error) {
        console.error('사용자 데이터 로드 중 오류 발생:', error);
        setUserId('Error');
      }
    };

    fetchUserData();
  }, []);

   return (
        <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['top', 'bottom']}>
              <StatusBar barStyle = {Platform.OS == 'ios' ? 'dark-content' : 'light-content'} backgroundColor = "#FFF5DB"/>

              <View style = {styles.headerContainer}>
                  <Image
                  source = { require('../../assets/icons/myIcon.png')}
                  style = {styles.icon}
                  />
                  <Text style={styles.header}>Money-Book</Text>
              </View>

              <View style={styles.customView} />
              <View style={styles.customView2} />
              <View style={styles.customView3} />
              <View style={styles.customView4} />

              {/* 텍스트 및 버튼 배치 */}
              <View style={styles.content}>
                  <Text style={styles.title}>환영합니다{'\n'} {userId} 님 </Text>
              </View>

          </SafeAreaView>
      );
  }

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF5DB',
    },
    content: {
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.2, // 화면 높이를 기준으로 설정
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.01,
        left: width * 0.05,
        zIndex: 1,
    },
    icon: {
        width: width * 0.07, // 화면 너비의 7%
        height: width * 0.07,
        left: width * 0.0001,
        marginRight: width * 0.01,
        marginTop: Platform.OS === 'ios' ? height * 0.073 : height * 0.007,
        resizeMode: 'contain',
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? height * 0.07 : height * 0.001,
        left: width * 0.07,
        fontSize: width * 0.06,
        fontWeight: '800',
        color: '#337D69',
        zIndex: 1,
        fontFamily: 'Pridi-SemiBold',
    },
    title: {
        fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.065,
        textAlign: 'center',
        fontWeight: '800',
        marginTop: Platform.OS === 'ios' ? height * 0.04 : height * 0.17,
        marginBottom: height * 0.02,
        color: '#FFFFFF',
        fontFamily: 'Pridi-Bold',
        zIndex: 0,
        lineHeight: height * 0.04, // 줄 간격 명시
    },
    customView: {
        position: 'absolute',
        left: Platform.OS === 'ios' ? width * 0.01 : width * 0.12,
        right: width * -0.2,
        top: Platform.OS === 'ios' ? height * 0.2 : height * 0.2,
        bottom: height * 0.5,
        backgroundColor: '#337D69',
        zIndex: 0,
        borderTopLeftRadius: Platform.OS === 'ios' ? width * 7 : width * 12,
        borderBottomRightRadius: height * 1.2,
    },
    customView2: {
        position: 'absolute',
        left: width * -1,
        right: width * 0.26,
        top: height * 0.17,
        bottom: height * 0.27,
        backgroundColor: '#59A15C',
        zIndex: 0,
        borderTopRightRadius: Platform.OS === 'ios' ? width * 0.8 : width * 1.4,
        borderBottomLeftRadius: height * 1,
    },
    customView3: {
        position: 'absolute',
        left: width * -0.1,
        right: width * -0.35,
        top: height * 0.37,
        bottom: height * 0.18,
        backgroundColor: '#79BFBC',
        zIndex: 0,
        borderTopLeftRadius: width * 2,
        borderBottomRightRadius: height * 1,
    },
    customView4: {
        position: 'absolute',
        left: Platform.OS === 'ios' ? width * -0.2 : width * -0.08,
        right: width * -0.06,
        top: height * 0.37,
        bottom: height * 0.18,
        backgroundColor: '#32A9A3',
        zIndex: 0,
        borderTopLeftRadius: Platform.OS === 'ios' ? width * 0.8 : width * 2.4,
        borderBottomRightRadius: height * 1.5,
    },
});

export default HomeScreen;