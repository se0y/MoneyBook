import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [confirm, setConfirm] = useState('');

  // 입력값 검수
  const validateInputs = () => {
    if (!userID || !email || !phone || !birth || !password || !confirm) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return false;
    }

    if (password !== confirm) {
      Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('이메일 오류', '올바른 이메일 형식이 아닙니다.');
      return false;
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('전화번호 오류', '올바른 전화번호 형식이 아닙니다. (예: 010-1111-2222)');
      return false;
    }

    const birthRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!birthRegex.test(birth)) {
      Alert.alert('생년월일 오류', '올바른 생년월일 형식이 아닙니다. (예: 2000/01/01)');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // Firestore에 사용자 데이터를 저장
      const userDocRef = firestore().collection('Users').doc(userID);

      const userData = {
        name: userID,
        email: email,
        phoneNumber: phone,
        birth: birth,
        password: password, // 실제 환경에서는 암호화 필요
      };

      await userDocRef.set(userData);

      Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.', [
            {
              text: '확인',
              onPress: () => {
                // 로그인 후 이메일 전달
                navigation.navigate('Home', { userEmail: email });
              },
            },
          ]);
    } catch (error) {
      console.error('회원가입 오류:', error.message);
      Alert.alert('오류 발생', `회원가입 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
     <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? null : null}
        style={{ flex: 1, width: '100%', alignContent: 'center' }}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            backgroundColor="#337D69"
          />
          <View style={styles.customView} />
          <Text style={styles.title}>계정 생성</Text>

          <Text style={styles.userID}>유저명</Text>
          <TextInput
            style={styles.userIDInput}
            placeholder="user"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={userID}
            onChangeText={(text) => setUserID(text)}
            autoCapitalize="none"
            color="#093030"
          />

          <Text style={styles.email}>이메일</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="moneybook@email.com"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            color="#093030"
          />

          <Text style={styles.phone}>전화번호</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="010 - 1234 - 5678"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={phone}
            onChangeText={(number) => setPhone(number)}
            autoCapitalize="none"
            color="#093030"
          />

          <Text style={styles.birth}>생년월일</Text>
          <TextInput
            style={styles.birthInput}
            placeholder="YYYY / MM / DD"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={birth}
            onChangeText={(number) => setBirth(number)}
            autoCapitalize="none"
            color="#093030"
          />

          <Text style={styles.password}>비밀번호</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            color="#093030"
          />

          <Text style={styles.passwordCheck}>비밀번호 확인</Text>
          <TextInput
            style={styles.passwordCheckInput}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(9, 48, 48, 0.45)"
            value={confirm}
            onChangeText={(text) => setConfirm(text)}
            secureTextEntry={true}
            color="#093030"
          />

          <View style={styles.content}>
            <TouchableOpacity style={styles.button2} onPress={handleSignUp}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.Already}>
            이미 계정이 있으신가요?
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              {' '}
              로그인
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#337D69',
    },
    content: {
        alignItems: 'center',
        position: 'absolute', // 텍스트와 버튼을 배경 위에 올려놓기 위해 절대 위치 사용
        top: Platform.OS === 'ios' ? 150 : 130, // 배경 아래에 배치할 수 있도록 조정
        width: '100%',
    },
    title: {
        position: 'center',
        top: Platform.OS === 'ios' ? -240 : 60,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    customView: {
        position: 'absolute',
        width: '100%',
        top: '20%',
        height: '100%',
        bottom: '-100%',
        backgroundColor: '#FFF7EA',
        zIndex: 0,
        borderRadius: 70,
    },
    button1: {
        width: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        backgroundColor: '#337D69',
        marginTop: 370,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    button2: {
        width: '55%',
        top: 580,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        backgroundColor: '#337D69',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        position: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    userID: {
        top: 190,
        right: 130,
        color: '#093030',
        fontSize: 15,
    },
    userIDInput: {
        top: 195,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.9)`,
    },
    email: {
        top: 205,
        right: 130,
        color: '#093030',
        fontSize: 15,
    },
    emailInput: {
        top: 210,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.9)`,
    },
    phone: {
        top: 220,
        right: 125,
        color: '#093030',
        fontSize: 15,
    },
    phoneInput: {
        top: 225,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.9)`,
    },
    birth: {
        top: 235,
        right: 125,
        color: '#093030',
        fontSize: 15,
    },
    birthInput: {
        top: 240,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.9)`,
    },
    password: {
        top: 248,
        right: 125,
        color: '#093030',
        fontSize: 15,
    },
    passwordInput: {
        top: 203,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        marginTop: 50,
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.45)`,
    },
    passwordCheck: {
        top: 210,
        right: 110,
        color: '#093030',
        fontSize: 15,
    },
    passwordCheckInput: {
        top: 165,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        marginTop: 50,
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.45)`,
    },
    Already: {
        fontSize: 10,
        top: 270,
    },
    loginLink: {
        fontSize: 10,
        marginRight: 20,
        color: '#3299FF',
    }
});

export default LoginScreen;