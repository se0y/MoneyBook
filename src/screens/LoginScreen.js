import React, {useState} from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, Platform, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function LoginScreen( { navigation } ) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        // 입력값 검증
        if (!email || !password) {
            Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.', [{ text: '확인'}]);
            return;
        } else if (!email) {
            Alert.alert(
                '이메일 입력 오류',
                '이메일을 입력해주세요.',
                [{ text: '확인' }]
            );
            return;
        } else if (!password) {
            Alert.alert(
                '비밀번호 입력 오류',
                '비밀번호를 입력해주세요.',
                [{ text: '확인' }]
            );
            return;
        }
        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('이메일 오류', '올바른 이메일 형식이 아닙니다.');
            return false;
        }
    
        try {
            // @react-native-firebase/auth를 사용한 로그인
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            
            if (userCredential.user) {
                // @react-native-firebase/firestore를 사용한 사용자 정보 조회
                const userDoc = await firestore()
                    .collection('Users')
                    .where('email', '==', email)
                    .get();

                if (!userDoc.empty) {
                    // 첫 번째 일치하는 문서의 데이터 가져오기
                    const userData = userDoc.docs[0].data();
                    console.log('로그인 성공:', userData);
                    
                    // 홈 화면으로 이동하며 사용자 정보 전달
                    navigation.navigate('Success', {
                        user: {
                            uid: userCredential.user.uid,
                            email: userData.email,
                            name: userData.name || '',
                            birth: userData.birth || '',
                            phoneNumber: userData.phoneNumber || ''
                        }
                    });
                } else {
                    Alert.alert('사용자 정보 오류', '사용자 정보를 찾을 수 없습니다.', [{ text: '확인'}]);
                    console.log('일치하는 사용자 정보가 없습니다.');
                }
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            
            // 에러 메시지 처리
            let title = '로그인 오류';
            let message = '로그인에 실패했습니다.';

            switch (error.code) {
                case 'auth/invalid-email':
                    title = '이메일 형식 오류';
                    message = '올바른 이메일 형식이 아닙니다.';
                    break;
                case 'auth/user-not-found':
                    title = '계정 없음';
                    message = '등록되지 않은 이메일입니다.';
                    break;
                case 'auth/wrong-password':
                    title = '비밀번호 오류';
                    message = '비밀번호가 올바르지 않습니다.';
                    break;
                case 'auth/too-many-requests':
                    title = '로그린 시도 초과';
                    message = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
                    break;
                case 'auth/network-request-failed':
                    title = '네트워크 오류';
                    message = '인터넷 연결을 확인해주세요.';
                    break;
                case 'auth/user-disabled':
                    title = '계정 비활성화';
                    message = '이 계정은 현재 비활성화 상태입니다.\n관리자에게 문의해주세요.';
                    break;
                default:
                    title = '로그인 실패';
                    message = '로그인 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.';
            }
            Alert.alert(
                title,
                message,
                [
                    { 
                        text: '확인',
                        onPress: () => {
                            // 심각한 오류인 경우 입력값 초기화
                            if (error.code === 'auth/network-request-failed' || 
                                error.code === 'auth/too-many-requests') {
                                setEmail('');
                                setPassword('');
                            }
                        }
                    }
                ]
            );
        }
    };

    return ( // 화면 구성
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior = {Platform.OS === 'ios' ? 'padding' : null} style = {{ flex: 1, width: '100%', alignContent: 'center' }} keyboardVerticalOffset = {80}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
                    <View style = {styles.customView}/>
                    <StatusBar barStyle = { Platform.OS === 'ios' ? 'dark-content' : 'light-content' } backgroundColor = { "#337D69" }/>

                    <Text style={styles.title}>환영합니다</Text>
                    {/* 로그인 화면 */}
                    {/* 이메일 입력 */}
                    <Text style = {styles.email}>이메일</Text>
                    <TextInput
                        style = {styles.emailInput}
                        placeholder = 'moneybook@email.com'
                        placeholderTextColor = "rgba(9, 48, 48, 0.45)"
                        value = {email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color = "#093030"
                        />
                    {/* 비밀번호 입력 */}
                    <Text style = {styles.password}>비밀번호</Text>
                    <TextInput 
                        style={styles.passwordInput} 
                        placeholder="Password" 
                        placeholderTextColor = "rgba(9, 48, 48, 0.45)"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        color = "#093030"
                        />

                    {/* 텍스트 및 버튼 배치 */}
                    <View style={styles.content}>
                            <TouchableOpacity style = {styles.button1} onPress={handleLogin}>
                                <Text style={styles.buttonText}>로그인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.button2} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.buttonText}>회원가입</Text>
                            </TouchableOpacity>
                    </View>
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
        position: 'absolute',
        top: Platform.OS === 'ios' ? 150 : 130,
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
        left: 0,             
        right: 0,           
        top: '20%',
        bottom: '-20%',      
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
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        backgroundColor: '#337D69',
        marginTop: 40,
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
    email: {
        top: 220,
        right: 130,
        color: '#093030',
        fontSize: 15,
    },
    emailInput: {
        top: 225,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.9)`,
    },
    password: {
        top: 245,
        right: 125,
        color: '#093030',
        fontSize: 15,
    },
    passwordInput: {
        top: 200,
        width: '80%',
        position: 'center',
        backgroundColor: '#F1DFC3',
        marginTop: 50,
        borderRadius: 15,
        paddingLeft: 20,
        paddingVertical: 10,
        color: `rgba(0, 0, 0, 0.45)`,
    },
});

export default LoginScreen;