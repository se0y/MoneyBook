import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Image,
} from 'react-native';

import styles from '../../styles';  // styles.js 파일을 import

function HomeScreen( { navigation } ) {
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
                <Text style={styles.title}>It's Time to Check{'\n'}Money Book!</Text>
                {/* <View style={styles.button1}> */}
                    <TouchableOpacity style = {styles.button1} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>로그인</Text>
                    </TouchableOpacity>
                {/* </View> */}
                {/* <View style={styles.button2}> */}
                    <TouchableOpacity style = {styles.button2} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                {/* </View> */}
            </View>

        </SafeAreaView>
    );
}



export default HomeScreen;