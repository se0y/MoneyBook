import React, {useState, useEffect} from 'react';
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
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


function SuccessScreen( { navigation } ) {
    const[userID, setUserID] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;  // 현재 로그인된 사용자 정보

                if (user) {
                    // Firestore 인스턴스 가져오기
                    const db = getFirestore();
                    
                    // Firestore에서 사용자 정보 조회
                    const usersRef = collection(db, 'Users');
                    const q = query(usersRef, where('email', '==', user.email));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        // 첫 번째 일치하는 문서의 데이터에서 이름 가져오기
                        const userData = querySnapshot.docs[0].data();
                        console.log('성공적으로 사용자 데이터를 불러왔습니다:', userData);
                        setUserID(userData.name);  // Firestore에 저장된 이름 사용
                    } else {
                        console.log('사용자 문서를 찾을 수 없습니다');
                        setUserID('Unknown User');
                    }
                } else {
                    console.log('로그인된 사용자가 없습니다');
                    setUserID('Guest');
                }
            } catch (error) {
                console.error('사용자 데이터 로드 중 오류 발생:', error);
                setUserID('Error');
            }
        };

        fetchUserData();

        const timer = setTimeout(() => {
            navigation.replace('Category'); // 'Category'는 다음 페이지
        }, 3000);

        return () => clearTimeout(timer);

    }, []);


    return (
        <SafeAreaView style={styles.container}>
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
                <Text style={styles.title}>환영합니다{'\n'}{userID} 님</Text>
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



export default SuccessScreen;