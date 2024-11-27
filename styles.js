// // styles.js
// import { StyleSheet, Platform } from 'react-native';
// import { Dimensions } from 'react-native';


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FFF5DB',
//     },
//     content: {
//         alignItems: 'center',
//         position: 'absolute', // 텍스트와 버튼을 배경 위에 올려놓기 위해 절대 위치 사용
//         top: Platform.OS === 'ios' ? 150 : 130, // 배경 아래에 배치할 수 있도록 조정
//         width: '100%',
//     },
//     headerContainer: {
//         flexDirection: 'row',  // 텍스트와 아이콘을 나란히 배치
//         alignItems: 'center',
//         position: 'absolute',
//         top: 10,
//         left: 20,
//         zIndex: 1,
//     },
//     icon: {
//         width: 25,
//         height: 25,
//         marginRight: 10,
//         resizeMode: 'contain',
//     },
//     header: {
//         position: 'absolute',
//         top: Platform.OS === 'ios' ? 30 : -4.5,
//         left: 27,
//         fontSize: 22,
//         fontWeight: '800',
//         color: '#337D69',
//         zIndex: 1, // 배경 위에 놓기 위한 zIndex 설정
//         fontFamily: 'Pridi-SemiBold',
//     },
//     title: {
//         fontSize: Platform.OS === 'ios' ? 24 : 30,
//         textAlign: 'center',
//         fontWeight: '800',
//         marginTop: 30,
//         marginBottom: 20,
//         color: '#FFFFFF',
//         fontFamily: 'Pridi-Bold',
//     },
//     button1: {
//         width: '45%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 110, // 버튼과 텍스트 간 간격을 추가
//         backgroundColor: '#FFD38B',
//         borderRadius: Platform.OS === 'ios' ? 15 : 20,
//         color: '#093030',
//         paddingVertical: Platform.OS === 'ios' ? 10 : 10,
//         paddingHorizontal: 20,
//     },
//     button2: {
//         width: '45%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 20, // 버튼과 텍스트 간 간격을 추가
//         backgroundColor: '#FFF7EA',
//         borderRadius: Platform.OS === 'ios' ? 15 : 20,
//         color: '#093030',
//         paddingVertical: Platform.OS === 'ios' ? 10 : 10,
//         paddingHorizontal: 20,
//     },
//     buttonText: {
//         position: 'center',
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#093030',
//     },
//     customView: {
//         position: 'absolute',
//         left: '-7.18%',  // 왼쪽 비율 적용
//         right: '-15.38%',  // 오른쪽 비율 적용
//         top: Platform.OS === 'ios' ? '17.65%' : 130,  // 상단 비율 적용
//         bottom: Platform.OS === 'ios' ? '27.49%' : '50%', // 하단 비율 적용
//         backgroundColor: '#337D69', // 배경색 설정
//         zIndex: Platform.OS === 'ios' ? -2 : 0,
//         borderTopLeftRadius: Platform.OS === 'ios' ? 300 : 850,
//         borderBottomRightRadius: Platform.OS === 'ios' ? 900 : 790,
//     },
//     customView2: {
//         position: 'absolute',
//         left: '-9.18%',  // 왼쪽 비율 적용
//         right: 100,  // 오른쪽 비율 적용
//         top: 110,  // 상단 비율 적용
//         bottom: '27.49%',  // 하단 비율 적용
//         backgroundColor: '#59A15C', // 배경색 설정
//         zIndex: Platform.OS === 'ios' ? -2 : 0,
//         borderTopRightRadius: Platform.OS === 'ios' ? 300 : 750,
//         borderBottomLeftRadius: 900,
//     },
//     customView3: {
//         position: 'absolute',
//         left: '-3.64%',  // 왼쪽 비율 적용
//         right: '-35.21%',  // 오른쪽 비율 적용
//         top: Platform.OS === 'ios' ? '37.2%' : 300,  // 상단 비율 적용
//         bottom: '17.89%',  // 하단 비율 적용
//         backgroundColor: '#79BFBC', // 배경색 설정'
//         zIndex: Platform.OS === 'ios' ? -2 : 0,
//         borderTopLeftRadius: Platform.OS === 'ios' ? 300 : 500,
//         borderBottomRightRadius: Platform.OS === 'ios' ? 900 : 530,
//     },
//     customView4: {
//         position: 'absolute',
//         left: Platform.OS === 'ios' ? -110 : -100,  // 왼쪽 비율 적용
//         right: Platform.OS === 'ios' ? -20 : -15,  // 오른쪽 비율 적용
//         top: Platform.OS === 'ios' ? '37.2%': 300,  // 상단 비율 적용
//         bottom: '17.89%',  // 하단 비율 적용
//         backgroundColor: '#32A9A3', // 배경색 설정
//         zIndex: Platform.OS === 'ios' ? -2 : 0,
//         borderTopLeftRadius: Platform.OS === 'ios' ? 400 : 850,
//         borderBottomRightRadius: Platform.OS === 'ios' ? 900 : 900,
//     },
// });

// export default styles;


// styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

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
        left: width * 0.001,
        marginRight: width * 0.03,
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
        fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.07,
        textAlign: 'center',
        fontWeight: '800',
        marginTop: Platform.OS === 'ios' ? height * 0.04 : height * 0.03,
        marginBottom: height * 0.02,
        color: '#FFFFFF',
        fontFamily: 'Pridi-Bold',
    },
    button1: {
        width: width * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.09,
        backgroundColor: '#FFD38B',
        borderRadius: height * 0.03,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.05,
    },
    button2: {
        width: width * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        backgroundColor: '#FFF7EA',
        borderRadius: height * 0.03,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.05,
    },
    buttonText: {
        fontSize: width * 0.05,
        fontWeight: '500',
        color: '#093030',
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

export default styles;
