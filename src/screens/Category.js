import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Platform,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import Header from '../components/common/Header';

function Category( { navigation } ) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle = {Platform.OS == 'ios' ? 'dark-content' : 'light-content'} backgroundColor = "#FFF7EA"/>

            <View style={styles.headerContainer}>
                <Header title="카테고리별 확인" backgroundColor="#FFF7EA" marginRight={30} />
            </View>
            
            <Text style={styles.title}>카테고리</Text>

            {/* 텍스트 및 버튼 배치 */}
            <View style={styles.gridContainer}>
                {[
                    { name: '식비', icon: require('../../assets/icons/food.png') },
                    { name: '쇼핑', icon: require('../../assets/icons/shopping.png') },
                    { name: '카페', icon: require('../../assets/icons/cafe.png') },
                    { name: '편의점', icon: require('../../assets/icons/store.png') },
                    { name: '이체', icon: require('../../assets/icons/transfer.png') },
                    { name: '기타', icon: require('../../assets/icons/etc.png') }
                ].map((category, index) => (

                    <View key={index} style={styles.categoryContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CategoryDetails', {categoryName: category.name})}>
                            <Image 
                                source={category.icon}
                                style={styles.categoryIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.buttonText}>{category.name}</Text>
                    </View>
                ))}
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
        backgroundColor: '#FFF7EA',
    },
    content: {
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.2, // 화면 높이를 기준으로 설정
        width: '100%',
        marginTop: Platform.OS === 'ios' ? height * 0.15 : height * 0.1, // 전체 컨텐츠 위치 조정
    },
    headerContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? height * 0.08 : height * 0.02,
        left: width * 0.05,
        zIndex: 1,
    },
    hamburgerMenu: {
        width: width * 0.058,
        height: width * 0.03,
        justifyContent: 'space-between',
        marginLeft: width * 0.03,
        marginTop: height * 0.012,
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#000000',
        borderRadius: 2,
    },
    title: {
        fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.045,
        alignContent: 'center',
        textAlign: 'center',
        fontWeight: '800',
        marginTop: Platform.OS === 'ios' ? height * 0.04 : height * -0.43,
        marginBottom: height * 0.01,
        color: '#000000',
        fontFamily: 'Pridi-Bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: width * 0.9,
        justifyContent: 'space-evenly',
        marginTop: height * 0.02,
    },
    categoryContainer: {
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.05,
    },
    button: {
        width: width * 0.25,
        height: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD38B',
        borderRadius: height * 0.02,
    },
    categoryIcon: {
        alignContent: 'center',
        alignItems: 'center',
        width: width * 0.12,
        height: width * 0.12,
        resizeMode: 'contain',
        tintColor: '#66543E',  // 원하는 색상 코드로 변경
    },
    buttonText: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#093030',
        marginTop: height * 0.003,
    }
});

export default Category;